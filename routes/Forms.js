const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadAudio");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE FORMS [ADMIN]
router.post(
  "",
  admin,
  upload.single("audiofile"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10 })
    .withMessage("name should be at lease 10 characters"),

  body("question")
    .isString()
    .withMessage("please enter a valid question ")
    .isLength({ min: 20 })
    .withMessage("question name should be at lease 20 characters"),

  body("choice1")
    .isString()
    .withMessage("please enter a valid choiceone")
    .isLength({ min: 5 })
    .withMessage("choiceone should be at lease 5 characters"),
  body("choice2")
    .isString()
    .withMessage("please enter a valid choicetwo")
    .isLength({ min: 5 })
    .withMessage("choicetwo should be at lease 5 characters"),
  body("choice3")
    .isString()
    .withMessage("please enter a valid choicethree")
    .isLength({ min: 5 })
    .withMessage("choicethree should be at lease 5 characters"),

  body("answer").isString().withMessage("please enter a valid answer "),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- VALIDATE THE Audio
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Audio is Required",
            },
          ],
        });
      }

      // 3- PREPARE FORM OBJECT
      const forms = {
        name: req.body.name,
        question: req.body.question,
        audiofile: req.file.filename,
        answer: req.body.answer,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
      };

      // 4 - INSERT INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into forms set ? ", forms);
      res.status(200).json({
        msg: "forms created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// UPDATE FORMS [ADMIN]

router.put(
  "/:id", // params
  admin,
  upload.single("audiofile"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10 })
    .withMessage("name should be at lease 10 characters"),

  body("question")
    .isString()
    .withMessage("please enter a valid question ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),

  body("choice1")
    .isString()
    .withMessage("please enter a valid choiceone")
    .isLength({ min: 5 })
    .withMessage("choiceone should be at lease 5 characters"),
  body("choice2")
    .isString()
    .withMessage("please enter a valid choicetwo")
    .isLength({ min: 5 })
    .withMessage("choicetwo should be at lease 5 characters"),
  body("choice3")
    .isString()
    .withMessage("please enter a valid choicethree")
    .isLength({ min: 5 })
    .withMessage("choicethree should be at lease 5 characters"),

  body("answer").isString().withMessage("please enter a valid answer "),

  //body("answer").isNumeric().withMessage("please enter a valid answer "),
  // body("choices").isJSON(),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EXISTS OR NOT
      const forms = await query("select * from forms where id = ?", [
        req.params.id,
      ]);
      if (!forms[0]) {
        res.status(404).json({ ms: "forms not found !" });
      }

      // 3- PREPARE MOVIE OBJECT
      const formObj = {
        name: req.body.name,
        question: req.body.question,
        answer: req.body.answer,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
      };

      if (req.file) {
        formObj.audiofile = req.file.filename;
        fs.unlinkSync("./upload/" + forms[0].audiofile); // delete
      }

      // 4- UPDATE
      await query("update forms set ? where id = ?", [formObj, forms[0].id]);

      res.status(200).json({
        msg: "forms updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE FORMS [ADMIN]
router.delete(
  "/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF FORMS EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const form = await query("select * from forms where id = ?", [
        req.params.id,
      ]);
      if (!form[0]) {
        res.status(404).json({ ms: "form not found !" });
      }
      // 2- REMOVE Audio
      fs.unlinkSync("./upload/" + form[0].audiofile); // delete old
      await query("delete from forms where id = ?", [form[0].id]);
      res.status(200).json({
        msg: "FORM delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  const forms = await query(`select * from forms `);
  forms.map((form) => {
    form.audiofile = "http://" + req.hostname + ":4000/" + form.audiofile;
  });
  res.status(200).json(forms);
});
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);

  const forms = await query("select * from forms where id = ?", [
    req.params.id,
  ]);
  forms.map((form) => {
    form.audiofile = "http://" + req.hostname + ":4000/" + form.audiofile;
  });
  res.status(200).json(forms);
});

module.exports = router;
