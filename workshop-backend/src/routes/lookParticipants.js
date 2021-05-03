const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
let participants_db = require('../database/paricipants_db');
const config = require('../config/index');
const sign = config.sign;

//obtenemos los participantes por evento

router.get('/participants',(req,res)=>{
  let token = req.headers['authorization'];
  try {
    var decoded = jwt.verify(token, sign);
  } catch (error) {
      console.error("Error:",error.message)
  }
  const {admin_user} = decoded;
  const participants = participants_db.filter( admin => {
    return admin.admin_user === admin_user
  });
  res.json({data: participants[0].participants});
});

module.exports = router;