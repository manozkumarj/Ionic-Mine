
const express = require('express');

const router = express.Router();

const db =require('../database/database');





// '/doctor/test' for http requests
router.get('/test', (req, res) => {
  console.log('****');
  res.send("doctor test");
});

router.post('/register',(req,res) => {
  
  var userName = req.body.userName
  var email = req.body.email
  var password = req.body.password
  var params =[userName  , email , password]

  
  db.executeQuery("call sp_doctor_register(?,?,?)",params,res,db.sendResponseNormal);
});


router.post('/register',(req,res) => {
  
  var userName = req.body.userName
  var email = req.body.email
  var password = req.body.password
  var params =[userName  , email , password]

  
  db.executeQuery("call sp_doctor_register(?,?,?)",params,res,db.sendResponseNormal);
});


router.post('/personal',(req,res) => {

                                                              
  var doctorId = req.body.doctorId
  var name = req.body.name
  var phone = req.body.phone
  var email = req.body.email
  var gender = req.body.gender
  var dob = req.body.dob
  
  var params =[doctorId  ,name , phone ,  email , gender , dob]
  console.log(params);

  
  db.executeQuery("call sp_doctor_personal_save(?,?,?,?,?,?)",params,res,db.sendResponseNormal);
});


router.post('/login',(req,res) => {

  var userName = req.body.userName
  var password = req.body.password
  var params =[userName , password]
  db.executeQuery("call sp_doctor_login(?,?)",params,res, db.sendResponseNormal);

});

router.get('/kits/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  
  db.executeQuery("call sp_doctor_kits_get(?)",params,res,db.sendResponseNormal);
});


router.get('/kits/:doctorId/:kitId',(req,res) => {
  
  var doctorId = req.params.doctorId;
  var kitId = req.params.kitId

  var params =[doctorId , kitId]

  
  db.executeQuery("call sp_doctor_kit_detail_get(? ,?)",params,res,db.sendResponseNormal);
});


router.post('/kits',(req,res) => {

  var doctorId = req.body.doctorId
  var kitId = req.body.kitId? req.body.kitId : null;
  var kitName = req.body.kitName
  var kitDescription = req.body.kitDescription
  var kitPrice = req.body.kitPrice
  var params =[doctorId , kitId, kitName , kitDescription , kitPrice];

  console.log(params)
  db.executeQuery("call sp_doctor_kit_save(?,?,?,?,?)",params,res, db.sendResponseNormal);

});



router.get('/orders/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  
  db.executeQuery("call sp_doctor_orders_get(?)",params,res,db.sendResponseNormal);
});


router.get('/previous-consultations/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  db.executeQuery("call sp_doctor_previous_consultations(?)",params,res,db.sendResponseNormal);
});


router.get('/today-queue/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  db.executeQuery("call sp_doctor_today_queue(?)",params,res,db.sendResponseNormal);
});


router.get('/appointments/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  db.executeQuery("call sp_doctor_appointments(?)",params,res,db.sendResponseNormal);
});


router.get('/vitals/:userId/:relativeId',(req,res) => {
  
  var userId = req.params.userId
  var relativeId = req.params.relativeId

  var params =[userId , relativeId]

  db.executeQuery("call sp_doctor_uservitals_get(? ,?)",params,res,db.sendResponseNormal);
});



router.get('/medical-history/:userId/:relativeId',(req,res) => {
  
  var userId = req.params.userId
  var relativeId = req.params.relativeId

  var params =[userId , relativeId]

  db.executeQuery("call sp_doctor_usermedicalhistory_get(? ,?)",params,res,db.sendResponseNormal);
});


router.get('/lifestyle/:userId/:relativeId',(req,res) => {
  
  var userId = req.params.userId
  var relativeId = req.params.relativeId

  var params =[userId , relativeId]

  db.executeQuery("call sp_doctor_userlifestyle_get(? ,?)",params,res,db.sendResponseNormal);
});


router.post('/issue',(req,res) => {

  var userId = req.body.userId? req.body.userId : null;
  var doctorId = req.body.doctorId
  var issueType = req.body.issueType
  var email = req.body.email
  var phone = req.body.phone
  var issueDescrption = req.body.phone
  var params =[userId ,doctorId ,issueType, email,phone, issueDescrption];

  console.log(params)
  db.executeQuery("call sp_issue_save(?,?,?,?,?,?)",params,res, db.sendResponseNormal);

});


router.get('/master/issue',(req,res) => {
  

  var params =[]

  db.executeQuery("call sp_master_issue_get()",params,res,db.sendResponseNormal);
});


router.get('/consultation-details/:doctorId/:userId/:relativeId',(req,res) => {

  var doctorId = req.params.doctorId
  var userId = req.params.userId
  var relativeId = req.params.relativeId

  var params =[doctorId,userId , relativeId]

  db.executeQuery("call sp_doctor_consultation_details_get(? ,? ,?)",params,res,db.sendResponseNormal);
});


router.get('/payments/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  db.executeQuery("call sp_doctor_payments(?)",params,res,db.sendResponseNormal);
});


router.get('/user-previous-consultations/:doctorId/:userId/:relativeId',(req,res) => {
  
  var doctorId = req.params.doctorId;
  var userId = req.params.userId;
  var relativeId = req.params.relativeId;

  var params =[doctorId , userId , relativeId]

  db.executeQuery("call sp_doctor_user_previousconsultations(?,?,?)",params,res,db.sendResponseNormal);
});


router.post('/update-profile' , (req, res)=>{
  var doctorId = req.body.doctorId;
  var columnName = req.body.columnName;
  var columnValue = req.body.columnValue;
  
  var params =[doctorId , columnName, columnValue ];
  console.log(params)
  
  db.executeQuery("call sp_doctor_update_profile(?,?,?)",params,res,db.sendResponseNormal);
});

router.post('/professional' , (req, res)=>{
  var doctorId = req.body.doctorId;
  var columnName = req.body.columnName;
  var columnValue = req.body.columnValue;
  
  var params =[doctorId , columnName, columnValue ];
  console.log(params)
  
  db.executeQuery("call sp_doctor_professional_save(?,?,?)",params,res,db.sendResponseNormal);
});

router.get('/profile/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  db.executeQuery("call sp_doctor_profile_get(?)",params,res,db.sendResponseNormal);
});
router.get('/masters/',(req,res) => {
  
  

  var params =[]

  db.executeQuery("call sp_doctor_masters_get()",params,res,db.sendResponseNormal);
});


router.post('/clinics',(req,res) => {

  var doctorId = req.body.doctorId
  var clinicId = req.body.clinicId? req.body.clinicId : null;
  var clinicName = req.body.clinicName? req.body.clinicName : null;
  var clinicAddress= req.body.clinicAddress? req.body.clinicAddress : null;
  var walkinFee = req.body.walkinFee? req.body.walkinFee : null;
  var weekDays = req.body.weekDays? req.body.weekDays : null;
  var fromTime = req.body.fromTime? req.body.fromTime : null;
  var toTime = req.body.toTime? req.body.toTime : null;
  
  var params =[doctorId , clinicId , clinicName , clinicAddress , walkinFee , weekDays , fromTime , toTime];

  console.log(params)
  db.executeQuery("call sp_doctor_clinic_save(?,?,?,?,?,?,?,?)",params,res, db.sendResponseNormal);

});


router.get('/clinics/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  
  db.executeQuery("call sp_doctor_clinics_get(?)",params,res,db.sendResponseNormal);
});

router.get('/clinic/:doctorId/:clinicId',(req,res) => {
  
  var doctorId = req.params.doctorId;
  var clinicId = req.params.clinicId

  var params =[doctorId , clinicId]

  
  db.executeQuery("call sp_doctor_clinic_detail_get(? ,?)",params,res,db.sendResponseNormal);
});



router.get('/modes/:doctorId',(req,res) => {
  
  var doctorId = req.params.doctorId

  var params =[doctorId]

  
  db.executeQuery("call sp_doctor_modes_get(?)",params,res,db.sendResponseNormal);
});


router.get('/mode/:doctorId/:modeId',(req,res) => {
  
  var doctorId = req.params.doctorId;
  var modeId = req.params.modeId;

  var params =[doctorId , modeId]

  
  db.executeQuery("call sp_doctor_mode_detail_get(? ,?)",params,res,db.sendResponseNormal);
});


router.post('/modes',(req,res) => {

  var doctorId = req.body.doctorId
  var modeId = req.body.modeId? req.body.modeId : null;
  var session = req.body.session? req.body.session : null;
  var price= req.body.price? req.body.price : null;
  
  
  var params =[doctorId , modeId , session , price];

  console.log(params)
  db.executeQuery("call sp_doctor_mode_save(?,?,?,?)",params,res, db.sendResponseNormal);

});

router.post('/imagetest' , (req, res)=>{
  var doctorId = req.body.doctorId;
  var image = req.body.image ? Buffer.from(req.body.image, 'base64') : null;
  var params =[doctorId , image];
  
  db.executeQuery("call test(?,?)",params,res,db.sendResponseNormal);
});

router.get('/gettest',(req,res) => {
  var params =[]
  db.executeQuery("call gettest()",params,res,db.sendResponsePhoto);
});

module.exports = router;
