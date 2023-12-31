
const router = require('express').Router();
const favoriteC = require('../controllers/favoriteControllers')



router.get('/getall',favoriteC.getAll)
router.post('/insert',favoriteC.insert)
router.get('/getbyid/:id', favoriteC.getById);
router.get('/getbyfavorite/video',favoriteC.getByVideo);
router.get('/getverify',favoriteC.verify);
router.delete('/deletebyfavorite/video',favoriteC.deleteByVideo);
router.delete('/deletebyfavorite/total',favoriteC.deleteByVideoTotal);
router.delete('/deleteplayist',favoriteC.deletePlayist);
router.delete('/delete/:id', favoriteC.delete); 


module.exports = router;