const db = require("../db/database")
const {DataTypes} = require("sequelize")

const User = db.define("Users",{
    name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
    },
    state: {
        type:DataTypes.BOOLEAN,
        defaultValue: true
    },
});


module.exports = User;