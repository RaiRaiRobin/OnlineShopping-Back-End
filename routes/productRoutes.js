const express = require('express');
const router =  express.Router();

// controllers require
const productController = require('../controllers/productController');

router.put('/entry', productController.productEntry, (req, res, next) => {
    res.send({
        "status": 200,
        "message": "Entry Successful"
    })
});

router.get('/getProducts', productController.getProducts, (req, res, next) => {
    res.status(200);
    res.send({
        "products": req.productQueryResult
    })
})


// display products routes
router.get('/displayProducts/:productCategory/:currPosition/:range', productController.displayProducts, (req, res, next) => {
    res.status(200);
    res.send({
        "products": req.productList,
        "productEnd": req.dataFinish
    })
})

// upload products images 
const upload = require('../middleware/imageUpload');
router.post('/uploadProducts', upload.array("myFiles", 12), (req, res, next) => {
    res.status(200);
    res.send({
        "message": "successfully uploaded"
    })
})

module.exports = router;