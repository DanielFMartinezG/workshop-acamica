const express = require('express');
const router = express.Router();
let events_db = require('../database/events_db');

//separé la base de datos del evento y participantes para que solo el administrador pueda ver la lista
//de participantes
//get to events
router.get('/', (req,res)=>{
  return res.status(200).json({data: events_db});
})

module.exports = router;