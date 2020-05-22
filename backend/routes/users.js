const router = require("express").Router();
let user = require("../models/users");

router.route("/").get((req, res) => {
  user
    .find()
    .then((users) => res.json(users))
    .catch((e) => res.status(400).json("Error: " + e));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new user({
    name,
    email,
    password,
  });

  newUser
    .save()
    .then(() => {
      res.json("User added");
    })
    .catch((e) => {
      res.status(400).json("error: " + e);
    });
});

// delete users
router.route("/:id").delete((req, res) => {
  user
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((e) => res.json("Error: " + e));
});

// find user by id and validate password
router.route("/validation").get((req, res) => {
  const email = req.query.email;
  user
    .find({ email: email })
    .then((user) => res.json(user))

    .catch((e) => res.json("Error: " + e));
});

module.exports = router;
