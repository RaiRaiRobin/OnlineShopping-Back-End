const express = require('express');
const router =  express.Router();

// controllers require
const categoryController = require('../controllers/categoryController');

router.get('/getAllData', categoryController.getCatData, (req, res, next) => {
    res.status(200);
    res.send({
        "data": req.catData
    })
});

module.exports = router;