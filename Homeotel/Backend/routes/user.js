const express = require("express");
const router = express.Router();
const db = require("../database/database");

// 'user/test' for http requests
router.get("/test", (req, res) => {
  res.send("user test");
});

//loding masters for registration page
router.get("/registration/master", (req, res) => {
  var params = [];
  db.executeQuery(
    "call sp_master_registration_get() ",
    params,
    res,
    db.sendResponseNormal
  );
});

//loding masters for Lifestyle page
router.get("/lifestyle/master", (req, res) => {
  var params = [];
  db.executeQuery(
    "call sp_master_lifestyle_get() ",
    params,
    res,
    db.sendResponseNormal
  );
});

//loding masters for Medical History page
router.get("/medicalhostory/master", (req, res) => {
  var params = [];
  db.executeQuery(
    "call sp_master_medical_history() ",
    params,
    res,
    db.sendResponseNormal
  );
});

//registering a user
router.post("/register", (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone ? req.body.phone : null;
  var email = req.body.email;
  var password = req.body.email;
  var genderId = req.body.genderId;
  var maritalStatusId = req.body.maritalStatusId;
  var height = req.body.height;
  var weight = req.body.weight;
  var createdBy = req.body.createdBy;

  var params = [
    name,
    phone,
    email,
    password,
    genderId,
    maritalStatusId,
    height,
    weight,
    createdBy
  ];

  db.executeQuery(
    "call sp_user_register(?,?,?,?,?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

//User Login
router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var params = [email, password];

  db.executeQuery(
    "call sp_user_login(?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

module.exports = router;
