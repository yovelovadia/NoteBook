const express = require("express"); // helps backend routing
const mongoose = require("mongoose"); // helps connecting to mongodb
const cors = require("cors");

require("dotenv").config();

mongoose.set("useFindAndModify", false);

const app = express(); //set up
const port = process.env.PORT || 5000; //working port

app.use(cors());
app.use(express.json()); //returns in json

const uri = process.env.ATLAS_URI; //.env file meaning it is secret shhhh...

mongoose.connect(uri, {
  // connecting... always fill those prevent errors
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//use the routes given to send to db

const users = require("./routes/users");
app.use("/users", users);

const schedule = require("./routes/schedule");
app.use("/schedule", schedule);

////////////////////////////////////////////////

const connection = mongoose.connection; //check connection, once there is log it
connection
  .once("open", () => {
    console.log("MongoDB connection has been established successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
