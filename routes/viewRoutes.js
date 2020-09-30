const express = require('express');
const router = express.Router();

// controllers require
const viewController = require('../controllers/viewController');

// view contact form data
router.post('/contact', viewController.viewContact, (req, res, next) => {
    res.status(200);
    res.send({
        "type": res.type,
        "text": res.text
    });
});

// view modal contact form data
router.post('/modal-contact', viewController.viewModalContact, (req, res, next) => {
    res.status(200);
    res.send({
        "type": res.type,
        "text": res.text
    });
});

// view email
// router.post('/email', viewController.sendEmail, (req, res, next) => {
//     res.status(200);
//     res.send({
//         "message": "email workedddd"
//     });
// });

module.exports = router;