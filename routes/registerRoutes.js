const express = require('express');
const router =  express.Router();

// controllers require
const customerController = require('../controllers/customerController');
const employeeController = require('../controllers/employeeController');
const authenticationController = require('../controllers/authenticationController');

//register customer...
router.post('/user', customerController.registerValidation, customerController.checkUniquePhoneNumber, customerController.checkUniqueEmail,
	customerController.genUserID, customerController.hash, customerController.registerUser,
	authenticationController.getToken, authenticationController.addActiveUser, (req, res, next) => {
	res.status(200);
    res.send({
        "message": "Registration Successful",
        "accessToken": req.accessToken,
    })
});

//register employee...
router.post('/employee', employeeController.registerValidation, employeeController.checkUniquePhoneNumber, employeeController.checkUniqueEmail,
	employeeController.genUserID, employeeController.hash, employeeController.registerUser,
	authenticationController.getToken, authenticationController.addActiveUser, (req, res, next) => {
	res.status(200);
    res.send({
        "message": "Registration Successful",
        "accessToken": req.accessToken,
    })
});

module.exports = router;



