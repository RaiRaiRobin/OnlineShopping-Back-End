var mysequelize = require('../configs/dbconfigs')
const viewModalContact = mysequelize.sequelize.define('viewModalContact',
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
    contact: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    city_country: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    project_type: {
		type: mysequelize.Sequelize.STRING
    },
    budget: {
		type: mysequelize.Sequelize.STRING
    },
    detail: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    contact_by_phone: {
		type: mysequelize.Sequelize.BOOLEAN,
		allowNull : false
    }
},
{
    freezeTableName : true,
    tableName: 'view_modal_contact'
}
)

viewModalContact.sync({force:false})
 // .then(function(){
 //    console.log('view_modal_contact table created')
 // })
 // .catch(function(){
 // 	console.log('err creating view_modal_contact table')
 // })

module.exports = viewModalContact;