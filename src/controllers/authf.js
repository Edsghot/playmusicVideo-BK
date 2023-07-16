
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3030/api/users/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'emails']
}, (accessToken, refreshToken, profile, done) => {
  // Aquí puedes acceder a los datos del perfil de Facebook
  const email = profile.emails ? profile.emails[0].value : null;
  const name = profile.displayName;
  const clientID = profile.id;
  const displayName = profile.displayName;
  const photo = profile.photos ? profile.photos[0].value : null;

  // Puedes almacenar los datos en req.user si es necesario
  // Ejemplo de almacenamiento de datos en req.user
  const user = {
    email,
    name,
    clientID,
    displayName,
    photo
  };

  return done(null, user);
}));



// Serialización y deserialización del usuario para mantener la sesión de Passport.js
passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });