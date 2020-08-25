const express = require('express');
const router =  express.Router();

// controllers require
var authenticationController = require('../controllers/authenticationController');

router.post('/user', authenticationController.getUserID, authenticationController.delrefreshToken, (req, res, next) => {
    res.send({
        "status": 200,
        "message": "Logout Successful"
    })
});


module.exports = router;