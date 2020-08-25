var mysequelize = require('../configs/dbconfigs')
const product = mysequelize.sequelize.define('product',
{
	id: {
		type: mysequelize.Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull : false
    },
    index: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
	product_name: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    category: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
    },
    price: {
		type: mysequelize.Sequelize.FLOAT,
		allowNull : false
    },
    description: {
		type: mysequelize.Sequelize.STRING,
		allowNull : false
	}
},
{
    freezeTableName : true,
    tableName: 'products'
}
)

product.sync({force:false})
 /* .then(function(){
    console.log('active_user table created')
 })
 .catch(function(){
 	console.log('err creating active_user table')
 }) */
 
module.exports = product;  