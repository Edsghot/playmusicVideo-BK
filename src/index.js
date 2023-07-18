// Tu archivo principal

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./controllers/auth');
const userRouter = require('./routes/user.routes');
const musicRouter = require('./routes/music.routes');
const videoRouter = require('./routes/video.routes');
const favoriteRouter = require('./routes/favorite.routes');

const app = express();
const port = process.env.PORT || 3030;

// Configuración del middleware cors
app.use(cors({
  origin: 'http://localhost:4200', // Reemplaza con el origen correcto de tu aplicación frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Configuración del middleware de sesión
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Configuración del middleware de Passport
app.use(passport.initialize());
app.use(passport.session());

// ... más importaciones y configuraciones previas

// Rutas y otras configuraciones
app.use('/api/users/', userRouter);
app.use('/api/musics/', musicRouter);
app.use('/api/videos/', videoRouter);
app.use('/api/favorites/', favoriteRouter);

// Arranque del servidor
app.listen(port, () => {
  console.log('http://localhost:3030/api/');
});
