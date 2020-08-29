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
        ORDER BY id;',
        { type: mySeq.sequelize.QueryTypes.SELECT })
        .then(result => {
            let pos = req.params.currPosition - 1;
            let range = req.params.range;
            let data = [];
            if(range > 0){
                let count = 0;
                while(count < Math.abs(range)){
                    data.push(result[pos]);
                    count = count + 1;
                    if(pos < result.length - 1) pos = pos+1;
                    else pos = 0;
                }
            }
            else if(range < 0){
                let count = 0;
                while(count < Math.abs(range)){
                    data.push(result[pos]);
                    count = count + 1;
                    if(pos != 0) pos = pos-1;
                    else pos = result.length - 1;
                }
            }
            res.status(200)
            req.productList = data;
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