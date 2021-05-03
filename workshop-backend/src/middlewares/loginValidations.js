    const admins = require('../database/paricipants_db');
    const loginValidations = (req,res,next)=>{
        const {admin_user, admin_password} = req.body;
        const index = admins.findIndex(element => element.admin_user == admin_user);
        (index == -1)? (res.status(400).json({msg: "no existe el usuario, registrate", state: false})):
        (admins[index].admin_password !== admin_password )? (res.status(400).json({msg: "contraseña erronea", state: false})):(next());
    }
module.exports = loginValidations;
