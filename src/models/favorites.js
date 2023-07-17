const db = require("../db/database")
const {DataTypes} = require("sequelize")
const User = require('./User')
const Music = require('./Music')
const Video = require('./Video')


const Favorite = db.define('Favorite', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER
    },
    idMusic: {
      type: DataTypes.INTEGER,
      allowNull: true // Campo idMusic no obligatorio
    },
    idVideo: {
      type: DataTypes.INTEGER,
      allowNull: true // Campo idVideo no obligatorio
    }
  });
  
  Favorite.belongsTo(User, { foreignKey: 'idUser' });
  Favorite.belongsTo(Music, { foreignKey: 'idMusic' });
  Favorite.belongsTo(Video, { foreignKey: 'idVideo' });

module.exports = Favorite
