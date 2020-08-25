const express = require('express');
const router =  express.Router();

// controllers require
var authenticationController = require('../controllers/authenticationController');

router.post('/updateToken', 
authenticationController.updateToken, (req, res, next) => {
    res.send({
        "status": 200,
        "accessToken": req.accessToken,
        "message": "Acess token update Successful"
    })
});

module.exports = router;