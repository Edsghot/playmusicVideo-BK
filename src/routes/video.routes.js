const router = require('express').Router();
const VideoC = require('../controllers/videoControlles')
//=================GET=====================================
router.get('/getAll',VideoC.getAll)
router.get('/descargar',VideoC.descargar);
router.get('/descargarvideo',VideoC.descargarVideo)
router.get('/getById/:id', VideoC.getById);
//==================POST=======================================
router.post('/insert',VideoC.insert)
router.put('/update/:id',VideoC.update);
//================DELETE =================================================
router.delete('/delete/:id', VideoC.delete);
router.delete('/eliminarcache',VideoC.eliminarcache)

module.exports = router;