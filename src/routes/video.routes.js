const router = require('express').Router();
const VideoC = require('../controllers/videoControlles')

router.get('/getAll',VideoC.getAll)
router.post('/insert',VideoC.insert)
router.get('/getById:id',VideoC.getById)
router.delete('/delete:id',VideoC.delete)

module.exports = router;