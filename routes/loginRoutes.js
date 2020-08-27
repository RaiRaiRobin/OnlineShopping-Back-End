const express = require('express');
const router =  express.Router();

// controllers require
const authenticationController = require('../controllers/authenticationController');

router.post('/user', authenticationController.declareUser,
authenticationController.checkUser, authenticationController.matchPassword,
authenticationController.getToken, authenticationController.addActiveUser, (req, res, next) => {
    res.status(200);
    res.send({
        "accessToken": req.accessToken,
        "message": "Login Successful"
    })
});

/* router.post('/user', authenticationController.checkUserEmail, authenticationController.matchUserPassword,
authenticationController.token, (req, res, next) => {
    console.log(req.body); // req.body contains the parsed body of the request.
}); */

module.exports = router;