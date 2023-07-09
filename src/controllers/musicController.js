const Music = require("../models/Music")

exports.getAll = async (req,res) =>{
    try{
        const music = await Music.findAll();
        res.json({msg: "exitoso",result: music});
    }catch(error){
        res.status(500).json({message: 'Error retrieving Music',error: error})
    }
}

exports.insert = async(req,res)=>{
    try{
        const {name,description,url} = req.body;
        if(!name||!description||!url){
            res.status(400).json({msg: "uno o mas campos vacios"});
        }
        const music = await Music.create({name,description,url});

        res.status(201).json({msg: "operacion exitosa",result:music})
    }catch(error){
        res.status(500).json({message: "Error al insertar",error})
    }
}

exports.getById = async(req,res)=>{
    try{
        const {id} = req.params;
        const music = await Music.findByPk(id);

        if(!music){
            return res.status(404).json({msg: "music no encontrado"})
        }

        res.status(200).json({msg:"exitoso",result:music})
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}

exports.delete = async(req,res)=>{
    try{
        const {id} = req.params;
        
        const music = await Music.findByPk(id);
        if(!music){
            return res.status(404).json({
                msg: "No se encontro el music"
            })
        }

        await music.destroy();

        res.status(200).json({msg:"operacion exitosa"})
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}