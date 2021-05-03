const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
let participants_db = require('../database/paricipants_db');
const loginValidations = require('../middlewares/loginValidations');
const config = require('../config/index');
const sign = config.sign;

router.get('/', (req,res)=>{
    return res.status(200).json({data:participants_db})
})
router.post('/', loginValidations, (req,res)=>{
        const {admin_user, admin_password} = req.body;
        const index = participants_db.findIndex(element => element.admin_user == admin_user);
        const event = participants_db[index].id;
        let token = jwt.sign({ admin_user, event }, sign);
        const user_info = Object.assign({},participants_db[index]);
        delete user_info.admin_password;
        res.json({state: true,token: token, data: user_info});
});

module.exports = router;

