const express = require('express');
const userRouter = require('./routes/user.routes');
const videoRouter = require('./routes/video.routes')
const musicRouter = require('./routes/video.routes')
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



app.use(express.json());
app.use(cors());


app.use("/user/",userRouter);
app.use("/music/",videoRouter);
app.use("/video/",musicRouter);

app.listen(port,()=>{
    console.log("http://localhost:3030");
})