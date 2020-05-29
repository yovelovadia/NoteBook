const router = require("express").Router();
const note = require("../models/notes");
const verifyToken = require("./verifyToken");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// adding new note
router.route("/add-note").post(verifyToken, (req, res) => {
  const token = req.body.params.token.split(" ")[1];
  const userId = req.body.params.userId;

  jwt.verify(token, process.env.JWT_SECRET, (err, Auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const newNote = new note({
        userId,
        data: "",
      });

      newNote
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.sendStatus(500));
    }
  });
});

// deleteing empty notes
router.route("/delete-notes").delete((req, res) => {
  note
    .deleteMany({ data: "" })
    .then(() => res.json("deleted unneccesery notes"))
    .catch((err) => res.sendStatus(500));
});

//getting all notes for a specific user
router.route("/get-notes").get((req, res) => {
  const userId = req.query.userId;
  note
    .find({ userId })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

router.route("/update").put((req, res) => {
  const _id = req.body._id;
  const data = req.body.data;

  note
    .findOneAndUpdate({ _id }, { data })
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
