const participants_db = require('../database/paricipants_db');
const emailValidation=(req,res,next)=>{
  const email = req.body.email;
  //indices de evento y correo
  const event_index = participants_db.findIndex((element)=> element.id == req.params.idEvent);
  const email_index = participants_db[event_index].participants.findIndex((element)=> element.email == email);
  //verificar tipo de correo
  const include_hotmail = email.includes("@hotmail.com");
  const include_gmail = email.includes("@gmail.com");
  const include_yahoo = email.includes("@yahoo.com");
  //verificación de emails
  if(email_index != -1){
    return res.status(400).json({msg: "el email ya se encuentra registrado"})
  }else if(include_hotmail || include_gmail  || include_yahoo){
    return res.status(400).json({msg: "el email no puede ser hotmail, yahoo, ni gmail"})
  }
  next();
}
module.exports = emailValidation;