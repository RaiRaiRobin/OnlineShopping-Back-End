const validator = require("./validationController");
const mySeq = require('../configs/dbconfigs') 
const bcrypt = require('bcrypt'); //for hashing passwords...
const saltRounds = 10;
const customer_table = require('../models/customerModel');

const validationRule = require('./validationController');

const registerValidation = (req, res, next) => {
    if(validationRule.stringValidation(req.body.full_name) === true
     && validationRule.numberValidation(req.body.phone_number) === true
     && validationRule.phoneNumberLengthValidation(req.body.phone_number) == true 
     && ((validationRule.emailValidation(req.body.email) == true) || ((req.body.email == null)||(req.body.email == ""))) 
     && validationRule.passwordLengthValidation(req.body.password) == true 
     && validationRule.noSpaceValidation(req.body.password) == true)
    {
        next();
    }
    else
    {
        next({ "status": 401, "message": "Validation Error!!!" });
    }
}

const checkUniquePhoneNumber = (req, res, next) => {
    customer_table.findOne({
        where: { phone_number: req.body.phone_number }
    })
    .then(result => {
        if(result){
            next({ "status": 401, "message": "Phone number already exists!!!" });
        }else{
            req.userIDVal = req.body.phone_number;  
            next();
        }
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error", "err":err });
    })
}

const checkUniqueEmail = (req, res, next) => {
    if(req.body.email == null) next();
    customer_table.findOne({
        where: { email: req.body.email }
    })
    .then(result => {
        if(result){
            next({ "status": 401, "message": "Email already exists!!!" });
        }else{
            next();
        }
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error" });
    })
}

const genUserID = (req, res, next) => {
    mySeq.sequelize.query(
        'SELECT user_id\
        FROM customers\
        WHERE id = (SELECT MAX(id) FROM customers);',
        { type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        req.user_id = result[0].user_id - 1;
        next();
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error" });
    })
}

const hash = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            req.hash = hash;
            next();
        })
        .catch(function (err) {
            next({ "status": 400, "message": "System Error" });
        })
}

const registerUser = (req, res, next) => {
    customer_table.create({
        full_name: req.body.full_name,
        user_id: req.user_id,
        password: req.hash, 
        email: req.body.email,
        phone_number: req.body.phone_number
    })
    .then(function(result) {
        next();
    })
    .catch(function(err) {
        next({ "status": 500, "message": "DB Error" });
    })
}

const getUserData = (req, res, next) => {
     mySeq.sequelize.query(
        'SELECT full_name, email, phone_number\
        FROM customers\
        where phone_number = '+req.uID+';',
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200)
            req.userData = result;
            next();
        }).catch(err => {
            next({ "status": 500, "message": err });
    })
}
module.exports = {    
    registerValidation, 
    checkUniquePhoneNumber,
    checkUniqueEmail,
    genUserID,
    hash,
    registerUser,
    getUserData
}
