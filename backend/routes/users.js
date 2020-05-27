const app = require("express");
const router = app.Router();
const jwt = require("jsonwebtoken");
const user = require("../models/users");
const joi = require("@hapi/joi");
const verify = require("./verifyToken");
require("dotenv").config();

router.route("/check-jwt-exp").get((req, res) => {
  const token = req.query.token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, Auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json("logged");
    }
  });
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
    jwt.sign(
      { _id: getUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        res.json({ token });
      }
    );
  } else {
    res.status(401).json("Wrong password or email");
  }
});

//getting a name only
router.route("/:id").get((req, res) => {
  user
    .findById(req.params.id)
    .then((data) => res.json(data.name))
    .catch((err) => res.sendStatus(400));
});

// delete users
router.route("/:id").delete((req, res) => {
  user
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((e) => res.json("Error: " + e));
});

module.exports = router;
