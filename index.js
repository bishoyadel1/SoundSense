const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors());

const user = require("./routes/User");
const exam = require("./routes/Exam");
const auth = require("./routes/Auth");
const forms = require("./routes/Forms");

app.listen(4000, "localhost", () => {
  console.log("SERVER IS RUNNING ");
});
app.use("/user", user);
app.use("/exam", exam);
app.use("/auth", auth);
app.use("/forms", forms);
