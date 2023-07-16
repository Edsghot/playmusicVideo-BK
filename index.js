const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const app = express();
require("./src/controllers/authf");

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: "Unauthorized" });
}

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/facebook/failure" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/auth/protected");
  }
);

app.get("/auth/facebook/failure", (req, res) => {
  res.redirect("Something went wrong!");
});

app.get("/auth/protected", isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    let clientID = req.user.id;
    let displayName = req.user.displayName;
    let photo = req.user.photos ? req.user.photos[0].value : null;
  
    res.status(200).json({ name, clientID, displayName, photo });
  });
  


app.listen(3000, () => {
  console.log("listening on port 3000");
});
