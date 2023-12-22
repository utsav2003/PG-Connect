const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pgc0nnectorg@gmail.com",
    pass: "nrvyrbwsjutbsrif",
  },
});

module.exports = transporter;
