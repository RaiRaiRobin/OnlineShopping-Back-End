const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs')

// email
const nodemailer = require('nodemailer');

const viewContactModel = require('../models/viewContactModel');
const viewModalContactModel = require('../models/viewModalContactModel');

var sendEmail = (req, res, next) => {
    // email credentials
    var transporter = nodemailer.createTransport({
        host: "mail.intelligenceforecast.com",
        port: 465,
        auth: {
            user: "abdullah@intelligenceforecast.com",
            pass: "Abdullah_123"
        }
    });
    var mailOptions = {
        from: req.from,
        to: req.to,
        subject: req.subject,
        html: req.html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            next({"status": 500, "message": error});
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            next();
        }
    });
}

const viewContact = (req, res, next) => {
    viewContactModel.create({
        name: req.body.userName,
        email: req.body.userEmail,
        subject: req.body.userSubject,
        message: req.body.userMessage
    })
        .then(function (result) {
            let emailData = {
                "from": "info@intelligenceforecast.com",
                "to": "abdullah@intelligenceforecast.com",
                "subject": "Contact us form data",
                "html": "<h3>Name: " + req.body.userName + "</h3></br><h3>Email: " + req.body.userEmail + "</h3></br><h3>Subject: " + req.body.userSubject + "</h3></br><h3>Message: " + req.body.userMessage + "</h3>"
            }
            res.text = "Thank you for contacting us 😊";
            sendEmail(emailData);
            next();
        })
        .catch(function (err) {
            next({"status": 500, "text": "Database Error", "type": "error"});
            // next({"status": 500, "message": "DB Erroror"});
        })
}

const viewModalContact = (req, res, next) => {
    if (req.body.quoteCheckbox == "on") {
        req.body.contactByPhone = 1;
    } else {
        req.body.contactByPhone = 0;
    }
    viewModalContactModel.create({
        name: req.body.quoteName,
        email: req.body.userEmail,
        contact: req.body.userPhone,
        city_country: req.body.userAddress,
        project_type: req.body.projectType,
        budget: req.body.quoteBudget,
        detail: req.body.userMessage,
        contact_by_phone: req.body.contactByPhone
    })
        .then(function (result) {
            let emailData = {
                "from": "info@intelligenceforecast.com",
                "to": "rai.robin1000@gmail.com",
                "subject": "Speak to us data",
                "html": "<h3>Name: " + req.body.quoteName + "</h3></br><h3>Email: " + req.body.userEmail + "</h3></br><h3>Contact: " + req.body.userPhone + "</h3></br><h3>City/Country: " + req.body.userAddress + "</h3></br><h3>Project type: " + req.body.projectType + "</h3></br><h3>Budget: " + req.body.quoteBudget + "</h3></br><h3>detail: " + req.body.userMessage + "</h3></br><h3>Contact by phone: " + req.body.contactByPhone + "</h3>"
            }
            res.text = "Thank you for choosing us 😊";
            sendEmail(emailData);
            next();
        })
        .catch(function (err) {
            next({"status": 500, "text": "Database Error", "type": "error"});
        })
}

module.exports = {
    viewContact,
    viewModalContact,
    sendEmail
}