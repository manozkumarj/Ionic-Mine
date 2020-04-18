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

// User Details
router.get("/user-details/:userId", (req, res) => {
  var userId = req.params.userId;
  // console.log("Received useruserId -> " + userId);
  var params = [userId];

  db.executeQuery(
    "call sp_user_profile_details(?)",
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
router.get("/doctor-homeokits/:doctorId/:userId", (req, res) => {
  var doctorId = req.params.doctorId;
  var userId = req.params.userId;
  // console.log("Received doctorId -> " + doctorId);
  // console.log("Received userId -> " + userId);
  var params = [doctorId, userId];

  db.executeQuery(
    "call sp_user_doctorKits_get(?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// getting user's appointments
router.get("/appointments/:userId", (req, res) => {
  var userId = req.params.userId;
  // console.log("Received userId -> " + userId);
  var params = [userId];

  db.executeQuery(
    "call sp_user_appointments_get(?)",
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
  // console.log("Received doctorId -> " + doctorId);
  var params = [doctorId];

  db.executeQuery(
    "call sp_user_doctorConsultant_masters_get(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Booking an appointment
router.post("/book-appointment", (req, res) => {
  var appointmentId = req.body.appointmentId;
  var userId = req.body.userId;
  var doctorId = req.body.doctorId;
  var relativeId = req.body.relativeId;
  var price = req.body.price;
  var dateNtime = req.body.dateNtime;
  var modeId = req.body.modeId;
  var mainComplaint = req.body.mainComplaint;
  var params = [
    appointmentId,
    doctorId,
    userId,
    relativeId,
    modeId,
    dateNtime,
    price,
    mainComplaint,
  ];

  // console.log("Received params");
  // console.log(params);

  db.executeQuery(
    "call sp_user_book_appointment(?,?,?,?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Upserting complaint details
router.post("/upsert-complaint-details", (req, res) => {
  var appointmentId = req.body.appointmentId;
  var userId = req.body.userId;
  var doctorId = req.body.doctorId;
  var relativeId = req.body.relativeId;
  var isRecurring = req.body.isRecurring;
  var recurringFreq = req.body.recurringFreq;
  var severityId = req.body.severityId;
  var complaintDescription = req.body.complaintDescription;
  var params = [
    appointmentId,
    userId,
    doctorId,
    relativeId,
    isRecurring,
    recurringFreq,
    severityId,
    complaintDescription,
  ];

  // console.log("Received params");
  // console.log(params);

  db.executeQuery(
    "call sp_user_complaint_detail(?,?,?,?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Update profile details
router.post("/update-profile", (req, res) => {
  var userId = req.body.userId;
  var columnName = req.body.columnName;
  var value = req.body.value;
  var params = [userId, columnName, value];

  db.executeQuery(
    "call sp_user_update_profile(?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

router.post("/photo-save", (req, res) => {
  var userID = req.body.user_id;
  var relativeId = req.body.relative_id;
  var photo = req.body.photo;
  var params = [userID, relativeId, photo];

  db.executeQuery(
    "call sp_user_photo_save(?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

router.get("/photo-get/:user-id/:relative-id", (req, res) => {
  var userID = req.params.user - id;
  var relativeId = req.params.relative - id;
  var params = [userID, relativeId];
  db.executeQuery(
    "call sp_user_photo_get(?,?)",
    params,
    res,
    db.sendResponsePhoto
  );
});

// Upserting vitals
router.post("/upsert-vital", (req, res) => {
  var userID = req.body.userId;
  var vitalId = req.body.vitalId;
  var relativeId = req.body.relativeId;
  var temperature = req.body.temperature;
  var pulserate = req.body.pulserate;
  var respiratoryrate = req.body.respiratoryrate;
  var bpSystolic = req.body.bpSystolic;
  var bpDiastolic = req.body.bpDiastolic;
  var params = [
    userID,
    vitalId,
    relativeId,
    temperature,
    pulserate,
    respiratoryrate,
    bpSystolic,
    bpDiastolic,
  ];

  // console.log("Received params");
  // console.log(params);

  db.executeQuery(
    "call sp_user_vital_upsert(?,?,?,?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Fetching vitals
router.get("/get-vitals/:userId", (req, res) => {
  var userId = req.params.userId;
  // console.log("Received userId -> " + userId);
  var params = [userId];

  db.executeQuery(
    "call sp_user_vitals_get(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Fetching files
router.get("/get-files/:userId", (req, res) => {
  var userId = req.params.userId;
  // console.log("Received userId -> " + userId);
  var params = [userId];

  db.executeQuery(
    "call sp_user_files_get(?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Upserting files
router.post("/upsert-file", (req, res) => {
  var userID = req.body.userId;
  var relativeId = req.body.relativeId;
  var fileId = req.body.fileId;
  var fileTypeId = req.body.fileTypeId;
  var photo = req.body.photo;
  var params = [userID, relativeId, fileId, fileTypeId, photo];

  // console.log("Received params");
  // console.log(params);

  db.executeQuery(
    "call sp_user_file_upsert(?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

router.post("/issue", (req, res) => {
  var userId = req.body.userId;
  var doctorId = req.body.doctorId ? req.body.doctorId : null;
  var issueTypeId = req.body.issueTypeId;
  var email = req.body.email;
  var phone = req.body.phone;
  var issueDescrption = req.body.phone;
  var params = [userId, doctorId, issueTypeId, email, phone, issueDescrption];

  console.log(params);
  db.executeQuery(
    "call sp_issue_save(?,?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

router.get("/master/issue", (req, res) => {
  var params = [];
  db.executeQuery(
    "call sp_master_issue_get()",
    params,
    res,
    db.sendResponseNormal
  );
});

// Getting medical history details & masters
router.get(
  "/medical-history-masters-and-data/:userId/:relativeId",
  (req, res) => {
    var userId = req.params.userId;
    var relativeId = req.params.relativeId;
    var params = [userId, relativeId];
    // console.log("Received params -> " + params);

    db.executeQuery(
      "call sp_master_medical_history_get(?,?)",
      params,
      res,
      db.sendResponseNormal
    );
  }
);

// Upserting allergies
router.post("/upsert-medical-history", (req, res) => {
  var selectedMedicalHistoryTag = req.body.selectedMedicalHistoryTag;
  var userID = req.body.userId;
  var relativeId = req.body.relativeId;
  var commaSeparatedAllergies = req.body.commaSeparatedAllergies;
  var insertableAlleryObject = req.body.insertableAlleryObject;
  var params = [
    selectedMedicalHistoryTag,
    userID,
    relativeId,
    commaSeparatedAllergies,
    insertableAlleryObject,
  ];

  console.log("Received params");
  console.log(params);

  db.executeQuery(
    "call sp_user_medical_history_upsert(?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Getting Lifestyle details & masters
router.get("/lifestyle-masters-and-data/:userId/:relativeId", (req, res) => {
  var userId = req.params.userId;
  var relativeId = req.params.relativeId;
  var params = [userId, relativeId];
  // console.log("Received params -> " + params);

  db.executeQuery(
    "call sp_master_lifestyle_get(?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

// Upserting Lifestyle
router.post("/upsert-lifestyle", (req, res) => {
  var userID = req.body.userId;
  var relativeId = req.body.relativeId;
  var smokingId = req.body.smokingId;
  var alcoholId = req.body.alcoholId;
  var excerciseId = req.body.excerciseId;
  var activityId = req.body.activityId;
  var professionId = req.body.professionId;
  var foodId = req.body.foodId;
  var heatId = req.body.heatId;

  var params = [
    userID,
    relativeId,
    smokingId,
    alcoholId,
    excerciseId,
    activityId,
    professionId,
    foodId,
    heatId,
  ];

  console.log("Received params");
  console.log(params);

  db.executeQuery(
    "call sp_user_lifestyle_upsert(?,?,?,?,?,?,?,?,?)",
    params,
    res,
    db.sendResponseNormal
  );
});

module.exports = router;
