const {Sequelize} = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
  });


  module.exports = db;