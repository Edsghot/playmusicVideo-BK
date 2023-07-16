const db = require('../db/database')
const {DataTypes} = require('sequelize')
const User = require('./User')
const Music = require('./Music')
const Video = require('./Video')


const Favority = db.define('Favority',{
    type:{
        Type: DataTypes.STRING,
        allowNull: false
    }
})

Favority.belongsTo(User, { foreignKey: 'idUser' });
Favority.belongsTo(Music, { foreignKey: 'idMusic' });
Favority.belongsTo(Video, { foreignKey: 'idVideo' });

module.exports = Favority
