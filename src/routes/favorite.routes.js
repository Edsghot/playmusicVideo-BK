
const router = require('express').Router();
const favoriteC = require('../controllers/favoriteControllers')



router.get('/getall',favoriteC.getAll)
router.post('/insert',favoriteC.insert)
router.get('/getbyid/:id', favoriteC.getById);
router.delete('/delete/:id', favoriteC.delete); 

module.exports = router;