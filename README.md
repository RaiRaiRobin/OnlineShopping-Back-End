#Online Shopping
#This is a Online Shopping business web application.

#Step 1: Clone the project
#Step 2: open the terminal inside the project directory and run "npm install"

#/*connecting with database*/
#Step 3: Create a folder named "configs" under your project directory and create a file named "dbconfigs.js" under that folder.
#Step 3: Copy the following code and paste into that file and configure your database.  

	var Sequelize = require('sequelize');
	var sequelize = new Sequelize('databaseName', 'username', 'password', {
	    host: 'localhost',
	    port: 'port',
	    dialect: 'mysql',
	    logging: false
	});
	sequelize.authenticate()
	.then(function(){
	    console.log('DB successfully connected');
	})
	.catch(function(err){
	    console.log(err);
	})

	module.exports = {
	    sequelize,
	    Sequelize
	}

