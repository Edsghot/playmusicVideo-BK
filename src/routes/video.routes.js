const router = require('express').Router();
const VideoC = require('../controllers/videoControlles')
//=================GET=====================================
router.get('/getAll',VideoC.getAll)
router.get('/getById/:id', VideoC.getById);
router.get('/downloadById/:id',VideoC.descargarId)
//==================POST=======================================
router.post('/download',VideoC.descargar);
router.post('/insert',VideoC.insert)
router.put('/update/:id',VideoC.update);
//================DELETE =================================================
router.delete('/delete/:id', VideoC.delete);

module.exports = router;