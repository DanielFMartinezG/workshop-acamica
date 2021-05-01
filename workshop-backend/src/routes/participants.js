const express = require('express');
const router = express.Router();
let participants_db = require('../database/paricipants_db');

//obtenemos los participantes por evento
router.get('/:idEvent/participants',(req,res)=>{
  const index = participants_db.findIndex(evt => evt.id == req.params.idEvent);
  res.json({data: participants_db[index].participants});
})
module.exports = router;