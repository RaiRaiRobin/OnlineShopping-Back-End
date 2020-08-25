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
var mysequelize = require('./configs/dbconfigs.js');

// sequelize login database
var mysequelize = require('./models/adminModel.js');
var mysequelize = require('./models/employeeModel.js');
var mysequelize = require('./models/customerModel.js')
var mysequelize = require('./models/activeUserModel.js');
var mysequelize = require('./models/productModel.js');
var mysequelize = require('./models/productStatsModel.js');


//routes
const registerRoutes = require('./routes/registerRoutes');
myapp.use('/register', registerRoutes);

const loginRoutes = require('./routes/loginRoutes');
myapp.use('/login', loginRoutes);

const userRoutes = require('./routes/userRoutes');
myapp.use('/user', userRoutes);

// const updateTokenRoutes = require('./routes/updateTokenRoutes');
// myapp.use('/user', updateTokenRoutes);

const logoutRoutes = require('./routes/logoutRoutes');
myapp.use('/logout', logoutRoutes);

const googleRoutes = require('./routes/googleRoutes');
myapp.use('/', googleRoutes);

const productRoutes = require('./routes/productRoutes');
myapp.use('/products', productRoutes);

//openid authentication with passport.js and express

const passport = require('passport');
myapp.use(passport.initialize());
myapp.use(passport.session());

//openid authentication with pasport.js and express


// error handler
myapp.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status);
    res.send({
        "message": err.message
    })
})

//create https server
const fs = require('fs');
const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');
const https = require('https');
const server = https.createServer({key: key, cert: cert }, myapp);

myapp.get('/', (req, res) => { res.send('This is a secure server') });

server.listen(3000, () => console.log('Server started on port 3000'));


module.exports = myapp; 
    



/* const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); */
//API documentation
// debugger;
/* var swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Patient Information Manager', // Title (required)
        version: 'v1', // Version (required)
        description: 'API Documetation', // Description (optional)
    },
    host: 'localhost:3000', // Host (optional)
    basePath: '/', // Base path (optional)
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'authorization',
            scheme: 'bearer',
            in: 'header'
        }
    }
}
var options = {
    swaggerDefinition,
    apis: ['./app.js']
}
const swaggerSpec = swaggerJSDoc(options);
myapp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); */