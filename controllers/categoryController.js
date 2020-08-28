const Sequelize = require('sequelize');
const mySeq = require('../configs/dbconfigs') 

const category = require('../models/categoryModel');

const getCatData = (req, res, next) => {
	mySeq.sequelize.query(
        "SELECT name\
        FROM categories\
        ORDER BY 'id';",
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200)
            req.catData = result;
            next();
        }).catch(err => {
            next({ "status": 500, "message": err });
    })
}

module.exports = {
	getCatData
}