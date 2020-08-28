const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');


const myapp = new express();

//this is the first middleware - application middleware , all routes hit this middleware first
myapp.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next(); // next passes to another application middleware 
});

// bodyParser
myapp.use(bodyParser.json());
myapp.use(bodyParser.urlencoded({ extended: true }));

// path
myapp.use(express.static(
    path.join(__dirname, '/resources/public')
));

// sequelize database
require('./configs/dbconfigs.js');

// sequelize database models
require('./models/adminModel');
require('./models/employeeModel');
require('./models/customerModel')
require('./models/activeUserModel');
require('./models/productModel');
require('./models/productStatsModel');
require('./models/categoryModel');


//routes
const registerRoutes = require('./routes/registerRoutes');
myapp.use('/register', registerRoutes);

const loginRoutes = require('./routes/loginRoutes');
myapp.use('/login', loginRoutes);

const userRoutes = require('./routes/userRoutes');
myapp.use('/user', userRoutes);

const logoutRoutes = require('./routes/logoutRoutes');
myapp.use('/logout', logoutRoutes);

const googleRoutes = require('./routes/googleRoutes');
myapp.use('/', googleRoutes);

const productRoutes = require('./routes/productRoutes');
myapp.use('/products', productRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
myapp.use('/category', categoryRoutes);

//openid authentication with passport.js and express
const passport = require('passport');
myapp.use(passport.initialize());
myapp.use(passport.session());


// error handler
myapp.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status);
    res.send({
        "message": err.message
    })
})

const http = require('http');
const server = http.createServer(myapp);

myapp.get('/', (req, res) => { res.send('This is a secure server') });

server.listen(3000, () => console.log('Server started on port 3000'));


module.exports = myapp; 
    