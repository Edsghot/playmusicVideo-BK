const router = require('express').Router();
const musicC = require('../controllers/musicController')

router.get('/getAll',musicC.getAll)
router.post('/insert',musicC.insert)
router.get('/getById/:id', musicC.getById);
router.put('/update/:id',musicC.update);
router.delete('/delete/:id', musicC.delete);


module.exports = router;