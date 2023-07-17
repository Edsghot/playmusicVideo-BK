const favorite = require('../controllers/favoriteControllers')
const Router = require('express').Router();


const router = Router();


router.get('/getall',favorite.getAll)



module.exports = router;