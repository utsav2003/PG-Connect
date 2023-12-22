const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
});

const userReg = new mongoose.model("userSchema", userSchema);
module.exports = userReg;
