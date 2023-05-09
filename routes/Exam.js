const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadAudio");
const util = require("util"); // helper
const fs = require("fs"); // file system

router.post(
  "",
  authorized,

  body("score").isNumeric().withMessage("please enter a valid score name"),
  body("id").isNumeric().withMessage("please enter a valid id"),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const forms = {
        score: req.body.score,
        user_id: req.body.id,
      };

      const query = util.promisify(conn.query).bind(conn);
      await query("insert into score set ? ", forms);
      res.status(200).json({
        msg: "score created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  const forms = await query("select * from score where user_id = ?", [
    req.params.id,
  ]);

  res.status(200).json(forms);
});

module.exports = router;
