const router = require("express").Router();
let schedule = require("../models/schedule");

router.route("/").get((req, res) => {
  schedule
    .find()
    .then((data) => res.json(data))
    .catch((e) => res.status(400).json("Error: " + e));
});

router.route("/:id").delete((req, res) => {
  schedule
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("event deleted"))
    .catch((e) => res.json("Error: " + e));
});

router.route("/add").patch((req, res) => {
  const email = req.body.email;
  const date = req.body.date;
  // start: req.body.startDate,
  // allDay: req.body.allDay,

  const newSchedule = new schedule({
    email,
    date,
  });

  newSchedule
    .save()
    .then(() => {
      res.json("new Event");
    })
    .catch((e) => {
      res.status(400).json("error: " + e);
    });
});

module.exports = router;
