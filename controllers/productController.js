const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
const mySeq = require('../configs/dbconfigs') 

const product = require('../models/productModel');  

const productEntry = (req, res, next) => {
    product.create({
        product_name: req.body.product_name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description
    })
    .then(function(result) {
        next();
    })
    .catch(function(err) {
        next({ "status": 500, "message": "DB Error" });
    })
}

const getProducts = (req, res, next) => {
    mySeq.sequelize.query(
        "SELECT id, product_name AS productName, category, price, description\
        FROM products\
        ORDER BY 'id' ASC LIMIT 5;",
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200)
            req.productQueryResult = result;
            next();
        }).catch(err => {
            next({ "status": 500, "message": err });
    })
}

const displayProducts = (req, res, next) => {
    mySeq.sequelize.query(
        'SELECT id, product_name AS productName, category, price, description\
        FROM products\
        WHERE category = "'+req.params.productCategory+'"\
        ORDER BY id ASC LIMIT 5;',
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200)
            // res.json(result);
            req.productList = result;
            next();
        }).catch(err => {
            next({ "status": 500, "message": err });
    })
}

/*product image upload*/




/*product image upload*/


module.exports = {
    productEntry,
    getProducts,
    displayProducts
}