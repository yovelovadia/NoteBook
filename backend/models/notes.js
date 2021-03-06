const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
});

const schedule_schema = mongoose.model("notes", notesSchema);

module.exports = schedule_schema;
