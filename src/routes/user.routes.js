const router = require("express").Router();
require('../controllers/auth');
require("../controllers/authf");
const passport = require('passport')
const userC = require("../controllers/userControllers");
const isLoggedIn = require('../midleware/mdLogin');

router.get("/getall", userC.getAll);
router.post("/insert", userC.Insert);
router.post("/login", userC.login);

router.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/users/auth/protected",
    failureRedirect: "/api/users/auth/google/failure",
  })
);

router.get("/auth/google/failure", (req, res) => {
  res.redirect("Something went wrong!");
});

router.get("/auth/protected", isLoggedIn, (req, res) => {
  let email = req.user.email;
  let name = req.user.displayName;
  let clientID = req.user.clientID;
  let displayName = req.user.displayName;
  let photo = req.user.photo;
  let provider = req.user.provider;
  let accessToken = req.user.accessToken;
  let refreshToken = req.user.refreshToken;

  res.status(200).json({ email, name, clientID, displayName, photo, provider, accessToken, refreshToken });
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

router.get("/auth/protected/fb", isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    let clientID = req.user.id;
    let displayName = req.user.displayName;
    let photo = req.user.photo;
  
    res.status(200).json({ name, clientID, displayName, photo });
  });
  


module.exports = router;
