const router =require('express').Router();
const userC = require("../controllers/userControllers")

router.get("/getall",userC.getAll)
router.post("/insert",userC.Insert)
router.post("/login",userC.login)
module.exports = router;