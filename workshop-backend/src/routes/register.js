const express = require('express');
const router = express.Router();
const emailValidation = require('../middlewares/registerValidations');
// let participants_db = require('../database/participants_db');
let participants_db = require('../database/paricipants_db');

//post envents participants
router.post('/:idEvent',emailValidation, (req,res)=>{
  let participant = req.body;
  const index = participants_db.findIndex(event => event.id == req.params.idEvent);
  const new_index = participants_db[index].participants.length + 1;
  participant.id = new_index;
  participants_db[index].participants.push(participant);
  return res.json({msg: "new register successful"});
})
module.exports = router;