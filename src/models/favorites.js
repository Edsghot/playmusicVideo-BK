const db = require('../db/database')
const {DataTypes} = require('sequelize')
const User = require('./User')
const Music = require('./Music')
const Video = require('./Video')


const Favorite = db.define('Favorite',{
    type:{
        Type: DataTypes.STRING,
        allowNull: false
    }
})

Favorite.belongsTo(User, { foreignKey: 'idUser' });
Favorite.belongsTo(Music, { foreignKey: 'idMusic' });
Favorite.belongsTo(Video, { foreignKey: 'idVideo' });

module.exports = Favorite
