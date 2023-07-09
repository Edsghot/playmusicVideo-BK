const db = require("../db/database")
const  {DataTypes} = require("sequelize")


const Music = db.define("Musics",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    }

})

module.exports = Music;