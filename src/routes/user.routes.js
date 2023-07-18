const router = require("express").Router();
require('../controllers/auth');
require("../controllers/authf");
const passport = require('passport')
const userC = require("../controllers/userControllers");
const isLoggedIn = require('../midleware/mdLogin');

router.get("/getall", userC.getAll);
router.get("/getbyid/:id", userC.getById);
router.post("/insert", userC.Insert);
router.get("/login", userC.login);
router.get("/auth/protected/fb", isLoggedIn,userC.loginFacebook );
router.get("/auth/protected", isLoggedIn, (req, res) => {
  res.header('Cross-Origin-Opener-Policy', 'same-origin')
     .header('Access-Control-Allow-Origin', 'http://localhost:4200')
     .json({ name: req.user.displayName, email: req.user.email });
});
router.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
/*
router.get("/auth/google/callback",passport.authenticate("google", {
    successRedirect: "http://localhost:4200",
    failureRedirect: "/api/users/auth/google/failure",
  })
);*/
router.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  // Verifica si el usuario se autenticó correctamente
  if (req.user) {
    // Usuario autenticado correctamente, devuelve los datos del usuario al frontend
    res.json({ success: true, user: req.user });
  } else {
    // Error de autenticación, devuelve un mensaje de error al frontend
    res.json({ success: false, message: "Error de autenticación de Google" });
  }
});

router.get("/auth/google/failure", (req, res) => {
  res.redirect("Something went wrong!");
});

//facebook
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/api/users/auth/facebook/failure" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/users/auth/protected/fb");
  }
);

router.get("/auth/facebook/failure", (req, res) => {
  res.redirect("Something went wrong!");
});


  


module.exports = router;
