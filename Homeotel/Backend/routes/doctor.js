
const express = require('express');

const router = express.Router();

const db =require('../database/database');






// '/doctor/test' for http requests
router.get('/test', (req, res) => {
  console.log('****');
  res.send("doctor test");
});

router.get('/register',(req,res) => {
  var params =[]
  db.executeQuery("Select * from  d_doctor",params,res,db.sendResponseNormal);

})

module.exports = router;
