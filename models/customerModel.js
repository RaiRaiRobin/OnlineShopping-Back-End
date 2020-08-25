/* creates a user table in the database */
var mysequelize = require('../configs/dbconfigs')
const customerRegister = mysequelize.sequelize.define('customerRegister',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},
	full_name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : true,
    },
	user_id: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : true,
		unique: true
    },
    password: {
		type: mysequelize.Sequelize.STRING,
		allowNull : true
    },
    email: {
		type: mysequelize.Sequelize.STRING,
		allowNull : true,
		unique: true
	},
	phone_number: {
		type: mysequelize.Sequelize.BIGINT,
		allowNull : false,
		unique: true
    }
},
{
    freezeTableName : true,
    tableName: 'customers'
}
)

customerRegister.sync({force:false})
/* .then(function(){
    console.log('user_accounts table created')
})
.catch(function(){
	console.log('err creating user_accounts table')
 }) */

module.exports = customerRegister;