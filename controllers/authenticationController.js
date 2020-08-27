const Sequelize = require('sequelize');
require('dotenv').config()
const bcrypt = require('bcrypt'); //for hashing passwords...
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const mySeq = require('../configs/dbconfigs') 



const customer_table = require('../models/customerModel');
const employee_table = require('../models/employeeModel');

const active_user = require('../models/activeUserModel');

const declareUser = (req, res, next) => {
    let user = req.body.user;
    if (/^[0-9]+$/.test(user)){
        req.user = "customer";
        req.user_table = customer_table;
        next();
    }else{
        req.user = "employee";
        req.user_table = employee_table;
        next();
    }
}

//check email and get password
const checkUser = (req, res, next) => {
    if(req.user == "employee"){
        employee_table.findOne({
            where: { email: req.body.user }
        })
        .then(result => {
            if(result){
                req.passwordVal = result.dataValues.password;
                req.userIDVal = result.dataValues.phone_number;
                next();
            }else{
                next({ "status": 401, "message": "Email not registered" });
            }
        })
        .catch(function(err) {
            next({ "status": 503, "message": "DB Error!!!" });
        })
    }
    else if(req.user == "customer"){
        customer_table.findOne({
            where: { phone_number: req.body.user }
        })
        .then(result => {
            if(result){
                req.passwordVal = result.dataValues.password;
                req.userIDVal = req.body.user;
                next();
            }else{
                next({ "status": 401, "message": "Phone number not registered" });
            }
        })
        .catch(function(err) {
            next({ "status": 503, "message": "DB Error!!!" });
        })
    }
}


const matchPassword = (req, res, next) => {
    bcrypt.compare(req.body.password, req.passwordVal, (err, res) => {
        if (res == true) {
            console.log("matched");
            next();
        } else if (res == false) {
            next({
                "status": 400,
                "message": "Password does not match"
            });
        }
    });
}

const getToken = (req, res, next) => {
    let refreshToken = jwt.sign({ uid: req.userIDVal }, process.env.REFRESH_TOKEN_SECRET);
    jwt.sign({ uid: req.userIDVal, rftoken: refreshToken }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' },
        (err, token) => {
            if (err != null || undefined) {
                console.log(err);
                res.send({ "status": "401", "message": "unauthorized" });
            } else {
                req.accessToken = token;
                req.refreshToken = refreshToken;
                next();
            }
        });
}

const addActiveUser = (req,res,next) => {
    active_user.create({
        userID: req.userIDVal,
        refresh_token: req.refreshToken
    })
    .then(result => {
        next();
    })
    .catch(function(err) {
        next({ "status": 500, "message": "DB Error" });
    })
}

const tokenVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        next({ status: 500, message: 'no authorization header present' })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err != null) {
                //"message": "jwt expired", "invalid token"
                if(err.message == "jwt expired"){

                }
                next({ status: 500, message: err.message })
            } else {
                req.uID = decoded.uid;
                next();
            }
        });
    }
}

//check token update functionality
const tokenUpdate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        next({ status: 401, message: 'no authorization header present' })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err != null) {
                next({ status: 401, message: err })
            } else {
                req.uID = decoded.uid;
                console.log(decoded);
                next();
            }
        });
    }
}


const getUserID = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        next({ status: 400, message: 'no authorization header present' })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err != null) {
                next({ status: 401, message: err.message })
            } else {
                req.uid = decoded.uid;
                req.rfTkn = decoded.rftoken;
                next();
            }
        });
    }
}


const delrefreshToken = (req, res, next) => {
    active_user.destroy({
        where: Sequelize.and(
            {userID: req.uid},
            {refresh_token: req.rfTkn})
    })
    .then(result => {
        if(result) next();
        else next({ "status": 401, "message": "Invalid user" });
    })
}

module.exports = {
    declareUser,
    checkUser,
    matchPassword,
    getToken,
    getUserID,
    delrefreshToken,
    addActiveUser,
    tokenVerification,
    tokenUpdate

}