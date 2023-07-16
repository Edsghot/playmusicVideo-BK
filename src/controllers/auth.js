const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    // Aquí deberías almacenar los datos del usuario en req.user
    // Puedes acceder al correo electrónico usando profile.emails[0].value
    // y almacenarlo en req.user.email o en la propiedad que desees
    // Ejemplo de almacenamiento de datos en req.user
    req.user = {
      email: profile.emails[0].value,
      displayName: profile.displayName
    };
    return done(null, profile);
  }));

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})