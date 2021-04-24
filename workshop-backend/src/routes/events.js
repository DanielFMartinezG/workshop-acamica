const express = require('express');
const router = express.Router();
let events_db = require('../database/events_db');

//get to events
router.get('/', (req,res)=>{
  return res.status(200).json({data: events_db});
})

module.exports = router;