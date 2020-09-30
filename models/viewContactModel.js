var mysequelize = require('../configs/dbconfigs')
const viewContact = mysequelize.sequelize.define('viewContact',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
    },
    name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	email: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    subject: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    message: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    }
},
{
    freezeTableName : true,
    tableName: 'view_contact'
}
)

viewContact.sync({force:false})
 // .then(function(){
 //    console.log('view_contact table created')
 // })
 // .catch(function(){
 // 	console.log('err creating view_contact table')
 // })

module.exports = viewContact;