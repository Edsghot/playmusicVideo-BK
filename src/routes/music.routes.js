
const router = require('express').Router();
const musicC = require('../controllers/musicController')



router.get('/getall',musicC.getAll)
router.get('/downloadbyId/:id',musicC.descargarId)
router.get('/downloadfile/:id',musicC.descargarId2)
router.get('/download', musicC.descargarmusica);
router.post('/insert',musicC.insert)
router.get('/getbyid/:id', musicC.getById);
router.put('/update/:id',musicC.update);
router.delete('/delete/:id', musicC.delete);
module.exports = router;