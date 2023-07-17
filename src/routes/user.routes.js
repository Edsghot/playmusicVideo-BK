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
router.get("/auth/protected", isLoggedIn, userC.loginGoogle);

router.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/google/callback",passport.authenticate("google", {
    successRedirect: "/api/users/auth/protected",
    failureRedirect: "/api/users/auth/google/failure",
  })
);

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
