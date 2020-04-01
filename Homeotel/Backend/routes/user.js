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
  console.log("From -> /register");
  console.log(req.body);
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  var params = [username, email, password];

  db.executeQuery(
    "call sp_user_register(?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

//User Login
router.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var params = [username, password];

  db.executeQuery(
    "call sp_user_login(?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// User Doctors
router.get("/my-doctors/:id", (req, res) => {
  var id = req.params.id;
  console.log("Received userId -> " + id);
  var params = [id];

  db.executeQuery(
    "call sp_user_doctors(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Searching doctor with UUID
router.get("/find-doctor/:uuid", (req, res) => {
  var uuid = req.params.uuid;
  console.log("Received uuid -> " + uuid);
  var params = [uuid];

  db.executeQuery(
    "call sp_user_find_doctor(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

module.exports = router;
