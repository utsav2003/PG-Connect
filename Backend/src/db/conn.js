const mongoose = require("mongoose");

//cluster db
const db = "mongodb://localhost:27017/PGConnect";

//for mongoDB Connection
mongoose
  .connect(db)
  .then(() => {
    console.log("Connection to DB Done ");
  })
  .catch((err) => {
    console.log(err);
  });
