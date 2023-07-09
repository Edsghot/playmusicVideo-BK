const db = require("../db/database")
const {DataTypes} = require("sequelize")

const Video = db.define("Videos",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
    }

})

module.exports = Video