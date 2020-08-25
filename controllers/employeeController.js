const validator = require("./validationController");
const mySeq = require('../configs/dbconfigs') 
const bcrypt = require('bcrypt'); //for hashing passwords...
const saltRounds = 10;
const employee_table = require('../models/employeeModel');

const validationRule = require('./validationController');

const registerValidation = (req, res, next) => {
    if(validationRule.stringValidation(req.body.full_name) === true
     && validationRule.numberValidation(req.body.phone_number) === true
     && validationRule.phoneNumberLengthValidation(req.body.phone_number) == true 
     && validationRule.emailValidation(req.body.email) == true 
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
    employee_table.findOne({
        where: { phone_number: req.body.phone_number }
    })
    .then(result => {
        if(result){
            next({ "status": 401, "message": "Phone number already exists in employee table!!!" });
        }else{
            req.userIDVal = req.body.phone_number;  
            next();
        }
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error from checkUniquePhoneNumber in employees." });
    })
}

const checkUniqueEmail = (req, res, next) => {
    if(req.body.email == null) next();
    employee_table.findOne({
        where: { email: req.body.email }
    })
    .then(result => {
        if(result){
            next({ "status": 401, "message": "Email already exists from employee_table!!!" });
        }else{
            next();
        }
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error from checkUniqueEmail in employee_table" });
    })
}

const genUserID = (req, res, next) => {
    mySeq.sequelize.query(
        'SELECT user_id\
        FROM employees\
        WHERE id = (SELECT MAX(id) FROM employees);',
        { type: mySeq.sequelize.QueryTypes.SELECT })
    .then(result => {
        req.user_id = result[0].user_id - 1;
        next();
    })
    .catch(err => {
        next({ "status": 200, "message": "DB error from genUserID in employee" });
    })
}

const hash = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            req.hash = hash;
            next();
        })
        .catch(function (err) {
            next({ "status": 400, "message": "System Error from hash in employee" });
        })
}

const registerUser = (req, res, next) => {
    employee_table.create({
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
        next({ "status": 500, "message": "DB Error from registerUser in employee" });
    })
}

const getUserData = (req, res, next) => {
     mySeq.sequelize.query(
        'SELECT full_name, email, phone_number\
        FROM employees\
        where phone_number = '+req.uID+';',
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200)
            req.userData = result;
            next();
        }).catch(err => {
            next({ "status": 500, "message": "DB error from getUserData in employee"});
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
