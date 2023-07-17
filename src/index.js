const express = require('express');
const passport = require('passport')
const session = require('express-session')
const userRouter = require('./routes/user.routes');
const videoRouter = require('./routes/video.routes')
const musicRouter = require('./routes/music.routes')
const favoriteRouter = require('./routes/favorite.routes')
const db = require("./db/database")
const cors = require("cors");


const app = express();

const port = process.env.PORT || 3030;

(async()=>{
    try{
    await db.authenticate();
    await db.sync();
    console.log("Conectados a la base de datos")
    }catch(error){
        throw new Error(error)
    }
})()

//midleware
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: false}
}));

app.use(express.json());
app.use(cors({
    origin: '*'
  }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/users/",userRouter);
app.use("/api/musics/",musicRouter);
app.use("/api/videos/",videoRouter);
app.use("/api/favorites/",favoriteRouter);

app.listen(port,()=>{
    console.log("http://localhost:3030/api/");
})