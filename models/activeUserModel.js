var mysequelize = require('../configs/dbconfigs')
const active_user = mysequelize.sequelize.define('active_user',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
	},
    userID: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	},
	refresh_token: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    }
},
{
    freezeTableName : true,
    tableName: 'active_user'
}
)

active_user.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */

module.exports = active_user;  