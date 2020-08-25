/* creates a user table in the database */
var mysequelize = require('../configs/dbconfigs')
const adminRegister = mysequelize.sequelize.define('adminRegister',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},
	username: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    password: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    email: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	}
},
{
    freezeTableName : true,
    tableName: 'admin'
}
)

adminRegister.sync({force:false})
/* .then(function(){
    console.log('user_accounts table created')
})
.catch(function(){
	console.log('err creating user_accounts table')
 }) */

module.exports = adminRegister;