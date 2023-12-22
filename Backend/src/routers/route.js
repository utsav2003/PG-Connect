const express = require("express");
const route = express.Router();

const jwt = require("jsonwebtoken");
const transporter = require("../mail/mailer.js");

//userReg Model import
const userReg = require("../models/userReg.js");

//for Insert data request
route.post("/userReg", async (req, res) => {
  console.log(req.body);
  try {
    const user = new userReg(req.body);
    const insert = await user.save();

    res.send(insert);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login verify user
let isLogin = false;
route.get("/userReg/login", async (req, res) => {
  try {
    console.log(req.query.email);
    const user = await userReg.find({
      email: req.query.email,
    });
    console.log(user);

    if (user.length != 0) {
      console.log(req.query.password, " ----- ", user[0].password);
      if (user[0].password == req.query.password) {
        isLogin = true;
        console.log("Login done");
        res.status(200).send({ isLogin: isLogin });
      } else {
        console.log(req.query.password, " ----- ", user[0].password);
        res.status(203).send({ isLogin: false });
        console.log("Password not match!!!");
      }
    } else {
      res.status(203).send({ isLogin: false });
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

// route.get("/userReg/set", async (req, res) => {
//   try {
//     isLogin = true;
//     res.send({ isLogin: isLogin });
//   } catch (err) {}
// });

route.get("/userReg/unset", async (req, res) => {
  try {
    isLogin = false;
  } catch (err) {}
});

route.get("/userReg/get", async (req, res) => {
  try {
    res.send({ isLogin: isLogin });
  } catch (err) {}
});

module.exports = route;
