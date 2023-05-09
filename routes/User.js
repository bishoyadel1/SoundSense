const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadAudio");
const util = require("util"); // helper
const fs = require("fs"); // file system

router.get("", async (req, res) => {
  authorized;
  const query = util.promisify(conn.query).bind(conn);

  const users = await query("select * from users", []);

  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  authorized;
  const query = util.promisify(conn.query).bind(conn);

  const User = await query("select * from users where id = ?", [req.params.id]);

  res.status(200).json(User);
});

router.delete("/:id", admin, async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("select * from users where id = ?", [
      req.params.id,
    ]);
    if (!user[0]) {
      res.status(404).json({ ms: "user not found !" });
    }

    await query("delete from users where id = ?", [user[0].id]);
    res.status(200).json({
      msg: "user delete successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(
  "/role/:id",
  admin,

  body("role").isNumeric().withMessage("please enter a valid role "),
  body("status").isNumeric().withMessage("please enter a valid status "),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const users = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!users[0]) {
        res.status(404).json({ ms: "users not found !" });
      }
      const userObj = {
        role: req.body.role,
        status: req.body.status,
      };

      await query("update users set ? where id = ?", [userObj, users[0].id]);

      res.status(200).json({
        msg: "users updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
  "/:id", // params
  authorized,

  body("name")
    .isString()
    .withMessage("please enter a valid name ")
    .isLength({ min: 5 })
    .withMessage(" name should be at lease 5 characters"),
  body("email")
    .isString()
    .withMessage("please enter a valid email")
    .isLength({ min: 5 })
    .withMessage("email should be at lease 5 characters"),
  body("phone")
    .isString()
    .withMessage("please enter a valid phone")
    .isLength({ min: 5 })
    .withMessage("phone should be at lease 5 characters"),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const checkEmailExists = await query(
        "select * from users where email = ?",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [
            {
              msg: "email already exists !",
            },
          ],
        });
      }

      // 2- CHECK IF User EXISTS OR NOT
      const user = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      // 3- PREPARE User OBJECT
      const formObj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      };

      // 4- UPDATE User
      await query("update users set ? where id = ?", [formObj, user[0].id]);
      delete formObj.password;
      res.status(200).json({
        msg: "forms updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
module.exports = router;
