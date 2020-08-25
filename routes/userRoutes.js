const express = require('express');
const router =  express.Router();
// controllers require
var authenticationController = require('../controllers/authenticationController');
var customerController = require('../controllers/customerController');
var employeeController = require('../controllers/employeeController');

//testing to send user data
router.get('/getCustomer', authenticationController.tokenVerification, customerController.getUserData, (req, res, next) => {
    res.status(200);
    res.send(req.userData[0]);
});

router.get('/getEmployee', authenticationController.tokenVerification, employeeController.getUserData, (req, res, next) => {
    res.status(200);
    res.send(req.userData[0]);
});


router.get('/updateToken', authenticationController.tokenUpdate, (req, res, next) => {
    res.status(200);
    res.send({
    	"message": "Token Update successful"
    });
});

module.exports = router;