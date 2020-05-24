const router = require("express").Router();
const jwt = require("jsonwebtoken");
const user = require("../models/users");
const joi = require("@hapi/joi");
const verify = require("./verifyToken");
require("dotenv").config();

router.route("/").get((req, res) => {
  user
    .find()
    .then((users) => res.json(users))
    .catch((e) => res.status(400).json("Error: " + e));
});

const signUpSchema = joi.object({
  name: joi.string().required().alphanum().min(2),
  email: joi.string().email().required(),
  password: joi.string().min(8).required().alphanum(),
});

router.route("/add").post(async (req, res) => {
  const validation = signUpSchema.validate(req.body);

  if (validation.error) {
    return res.status(400).json(validation.error.details[0].message);
  }

  const emailExist = await user.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json("Email already exists");
  }

  const newUser = new user({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.json("User Created");
    })
    .catch((e) => {
      res.status(400).json("error: " + e);
    });
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required().alphanum(),
});

// find user by id and validate password
router.route("/validation").get(async (req, res) => {
  const validation = loginSchema.validate(req.query);
  const email = req.query.email;
  const password = req.query.password;

  if (validation.error) {
    //if anything is not set right
    return res.status(400).json(validation.error.details[0].message);
  }

  const emailExist = await user.findOne({ email }); // check if user exists by the email
  if (!emailExist) {
    return res.status(400).json("Wrong password or email");
  }

  const getUser = await user.findOne({ email }); //login in and sending token
  if (getUser.password === password) {
    jwt.sign({ _id: getUser._id }, process.env.JWT_SECRET, (err, token) => {
      res.json({ token });
    });
  } else {
    res.status(401).json("Wrong password or email");
  }
});

//testtttt
router.route("/test").get(verify, (req, res, next) => {
  res.json(
    {
      message: "hey nigger",
    },
    req.user
  );
});

// delete users
router.route("/:id").delete((req, res) => {
  user
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((e) => res.json("Error: " + e));
});

module.exports = router;
