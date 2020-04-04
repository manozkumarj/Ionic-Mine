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
  // console.log("From -> /register");
  // console.log(req.body);
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
  // console.log("Received userId -> " + id);
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
  // console.log("Received uuid -> " + uuid);
  var params = [uuid];

  db.executeQuery(
    "call sp_user_find_doctor(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// getting doctor's homeokits
router.get("/doctor-homeokits/:doctorId", (req, res) => {
  var doctorId = req.params.doctorId;
  // console.log("Received doctorId -> " + doctorId);
  var params = [doctorId];

  db.executeQuery(
    "call sp_doctor_kits_get(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// adding doctor to user
router.post("/add-doctor", (req, res) => {
  var userId = req.body.userId;
  var doctorId = req.body.doctorId;
  var params = [userId, doctorId];

  db.executeQuery(
    "call sp_user_add_doctor(?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Purchasing homeokit
router.post("/purchase-homeokit", (req, res) => {
  var userId = req.body.userId;
  var doctorId = req.body.doctorId;
  var kitId = req.body.kitId;
  var price = req.body.price;
  var params = [userId, doctorId, kitId, price];

  db.executeQuery(
    "call sp_user_purchase_homeokit(?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Fetch doctor consultant details masters
router.get("/doctor-consultant-details-masters/:doctorId", (req, res) => {
  var doctorId = req.params.doctorId;
  console.log("Received doctorId -> " + doctorId);
  var params = [doctorId];

  db.executeQuery(
    "call sp_doctor_consultant_masters_get(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

module.exports = router;