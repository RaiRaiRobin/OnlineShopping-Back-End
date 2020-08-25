const express = require('express');
const router =  express.Router();

// controllers require
var customerController = require('../controllers/customerController');
var employeeController = require('../controllers/employeeController');
var authenticationController = require('../controllers/authenticationController');

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

// var validationController = require('../controllers/validationController');

// router.post('/user', validationController.stringValidation, validationController.numberValidation,
// validationController.phoneNumberLengthValidation, validationController.emailValidation,
//  validationController.noSpaceValidation, validationController.passwordLengthValidation, (req, res, next) => {
//  	res.status(200),
//     res.send({
//         "message": "Registration Successful"
//     })
// }); 


/* router.post('/user', function(req, res, next){
    console.log(req.body); // req.body contains the parsed body of the request.
}); */


module.exports = router;



