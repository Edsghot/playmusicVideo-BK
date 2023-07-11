const db = require("../db/database")
const {DataTypes} = require("sequelize")

const Video = db.define("Videos",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    download: {
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },

})

module.exports = Video