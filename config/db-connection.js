const Sequelize = require("sequelize");

//Environment Variables
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);



sequelize
  .authenticate()
  .then(() => {
    console.log("MySql DB Connected");
  })
  .catch((err) => {
      console.log("MySql DB connection problem ", err.message);
  })

  module.exports = sequelize;