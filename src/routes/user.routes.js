const router = require("express").Router();
require('../controllers/auth');
const passport = require('passport')
const userC = require("../controllers/userControllers");

router.get("/getall", userC.getAll);
router.post("/insert", userC.Insert);
router.post("/login", userC.login);

router.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/auth/google/failure", (req, res) => {
  res.redirect("Something went wrong!");
});

router.get("/auth/protected", isLoggedIn, (req, res) => {
  let email = req.user.email; // Obtener el correo electrónico del usuario autenticado

  res.send("Hello, " + email);
});

module.exports = router;
