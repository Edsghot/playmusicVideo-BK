const express = require('express');
const cors = require('cors');
const passport = require('./controllers/auth');
const session = require('express-session');
const userRouter = require('./routes/user.routes');
const videoRouter = require('./routes/video.routes')
const musicRouter = require('./routes/music.routes')
const favoriteRouter = require('./routes/favorite.routes')
const db = require("./db/database")
const app = express();
require('dotenv').config

const port = process.env.PORT || 3000;

(async()=>{
    try{
    await db.authenticate();
    await db.sync();
    console.log("Conectados a la base de datos")
    }catch(error){
        throw new Error(error)
    }
})()

// Configuración del middleware de sesión
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
// Configuración del middleware de Passport
app.use(passport.initialize());
app.use(passport.session());

// ... más importaciones y configuraciones previas

app.use("/api/users/",userRouter);
app.use("/api/musics/",musicRouter);
app.use("/api/videos/",videoRouter);
app.use("/api/favorites/",favoriteRouter);
// Rutas y otras configuraciones
// Arranque del servidor
app.listen(port, () => {
  console.log('http://localhos:'+port+'/api/');
});