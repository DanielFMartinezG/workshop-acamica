const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
let participants_db = require('../database/paricipants_db');
const config = require('../config/index');
const sign = config.sign;

//obtenemos los participantes por evento

router.get('/',(req,res)=>{
  let token = req.headers['authorization'];
  try {
    const decoded = jwt.verify(token, sign);
    const {admin_user} = decoded;
    const event = participants_db.filter( admin => {
      return admin.admin_user === admin_user
    });
    res.json({data:{id_event: event[0].id, participants: event[0].participants}});
  } catch (error) {
    res.json({Error: error.message})
  }
});

module.exports = router; 