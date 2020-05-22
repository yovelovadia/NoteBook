// "Schema" how the data should be delivered

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
  },
  { timestamps: true }
);

const users_schema = mongoose.model("user", userSchema); //compile the schema into a model ... somthing mongoose does

module.exports = users_schema;
