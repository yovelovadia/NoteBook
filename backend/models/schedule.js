const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  userId: {
    type: String,
  },
  date: {
    type: Object,
    required: true,
  },
});

const schedule_schema = mongoose.model("schedule", scheduleSchema);

module.exports = schedule_schema;
