const {Sequelize} = require("sequelize");

const db = new Sequelize('playmusicvideo', 'edsghot', 'Repro12345.', {
    host: 'db4free.net',
    dialect: 'mysql',
  });


  module.exports = db;