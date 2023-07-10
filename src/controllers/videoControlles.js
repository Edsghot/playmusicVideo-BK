const Video = require("../models/Video")
const { exec } = require('youtube-dl-exec');
const fs = require('fs');


exports.getAll = async (req,res) =>{
    try{
        const video = await Video.findAll();
        res.json({msg: "exitoso",result: video});
    }catch(error){
        res.status(500).json({message: 'Error retrieving video',error: error})
    }
}

exports.insert = async(req,res)=>{
    try{
        const {name,description,url} = req.body;
        if(!name||!description||!url){
            res.status(400).json({msg: "uno o mas campos vacios"});
        }
        const video = await Video.create({name,description,url});

        res.status(201).json({msg: "operacion exitosa",result:video})
    }catch(error){
        res.status(500).json({message: "Error al insertar",error})
    }
}

exports.getById = async(req,res)=>{
    try{
        const {id} = req.params;
        const video = await Video.findByPk(id);

        if(!video){
            return res.status(404).json({msg: "video no encontrado"})
        }

        res.status(200).json({msg:"exitoso",result:video})
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}

exports.delete = async(req,res)=>{
    try{
        const {id} = req.params;
        
        const video = await Video.findByPk(id);
        if(!video){
            return res.status(404).json({
                msg: "No se encontro el video"
            })
        }

        await video.destroy();

        res.status(200).json({msg:"operacion exitosa"})
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}

exports.update = async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,description,url} = req.body;

        const video = await Video.findByPk(id);
        if(!video){
            res.status(404).json({
                msg: "no hay Video"
            })
        }

        if(!name||!description||!url){
            res.status(400).json({
                msg: "uno o mas campos vacios"
            })
        }

        const update = await video.update({name,description,url})

        res.status(201).json({msg: "operacion exitosa!",result:update});
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}
exports.descargar = async (req, res) => {
  try {
    const url = 'https://www.youtube.com/watch?v=Ib5rYkMxI64';
    
    const options = {
      output: '%(title)s.%(ext)s', // Nombre del archivo de salida
      restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
    };

    let output;
    try {
      output = await exec(url, options);
    } catch (error) {
      console.error('Ocurrió un error al ejecutar youtube-dl:', error);
      return res.status(500).json({
        msg: "Error al descargar el video",
        error: error.message,
      });
    }

    // Obtener el nombre del archivo desde la salida de stdout
    const stdout = output.stdout;
    const nombreArchivoMatch = stdout.match(/Destination: (.+)\n/);
    const nombreArchivo = nombreArchivoMatch ? nombreArchivoMatch[1] : '';

    if (!nombreArchivo) {
        console.log("->",nombreArchivo);
      console.error('No se pudo obtener el nombre del archivo');
      return res.status(500).json({
        msg: "Error al descargar el video",
        error: "No se pudo obtener el nombre del archivo",
      });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
    fs.createReadStream(nombreArchivo).pipe(res);
  } catch (error) {
    console.error('Ocurrió un error al descargar el video:', error);
    res.status(500).json({
      msg: "Error al descargar el video",
      error: error.message,
    });
  }
};
