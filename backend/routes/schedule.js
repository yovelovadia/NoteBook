const router = require("express").Router();
const schedule = require("../models/schedule");
const verifyToken = require("./verifyToken");
const jwt = require("jsonwebtoken");

router.route("/").get((req, res) => {
  schedule
    .find()
    .then((data) => res.json(data))
    .catch((e) => res.status(400).json("Error: " + e));
});

router.route("/getDates").get((req, res) => {
  schedule
    .find({ userId: req.query.Logged })
    .then((data) => res.json(data))
    .catch((e) => res.status(400).json("Error: " + e));
});

router.route("/:id").delete((req, res) => {
  schedule
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("event deleted"))
    .catch((err) => res.status(400).json(err));
});

router.route("/change-position").put((req, res) => {
  const _id = req.body.id;
  const date = req.body.events;

  schedule
    .findOneAndUpdate({ _id }, { date })
    .then(() => res.json("event updated!"))
    .catch((err) => res.status(400).json(err));
});

router.route("/change-resize").put((req, res) => {
  const _id = req.body.id;
  const date = req.body.events;
  schedule
    .findOneAndUpdate({ _id }, { date })
    .then(() => res.json("event resized!"))
    .catch((err) => res.status(400).json(err));
});

router.route("/add").post(verifyToken, (req, res) => {
  const userId = req.body.params._id;
  const date = req.body.params.events;
  const token = req.body.params.token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, Auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const newSchedule = new schedule({
        userId,
        date,
      });

      newSchedule
        .save()
        .then(() => res.json("New event!"))
        .catch((err) => res.sendStatus(400));
    }
  });
});

module.exports = router;
