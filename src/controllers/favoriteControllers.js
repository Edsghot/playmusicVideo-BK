const Favorites = require('../models/favorites')

exports.getAll = async(req,res)=>{
    const favorite = await Favorites.findAll();
    res.status(200).json(favorite);
}