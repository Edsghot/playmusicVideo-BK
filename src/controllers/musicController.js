const Music = require("../models/Music")
const { exec } = require("youtube-dl-exec");
const fs = require("fs");
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

const path = require('path')


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
        const {id,name,description,url} = req.body;
        const state = false;
        const download = false;
        if(!id||!name||!description||!url){
            res.status(400).json({msg: "uno o mas campos vacios"});
        }
        const music = await Music.create({id,name,description,url,download,state});

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
exports.update = async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,description,url} = req.body;

        const music = await Music.findByPk(id);
        if(!music){
            res.status(404).json({
                msg: "no hay Musica"
            })
        }

        if(!name||!description||!url){
            res.status(400).json({
                msg: "uno o mas campos vacios"
            })
        }

        const update = await music.update({name,description,url})

        res.status(201).json({msg: "operacion exitosa!",result:update});

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


exports.descargarmusica = async (req, res) => {
    try {
      const { url } = req.body; // Obtener la URL del audio desde los parámetros de la solicitud
  
      const options = {
        output: 'audio.mp3', // Nombre del archivo de salida
        extractAudio: true, // Extrae solo el audio
        restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
      };

      await exec(url, options); // Descargar el audio
      
      // Enviar el archivo de audio como respuesta al frontend
      res.download('audio.mp3', 'audio.mp3', async (err) => {
        if (err) {
          console.error('Ocurrió un error al enviar el archivo al frontend:', err);
          res.status(500).send('Ocurrió un error al enviar el archivo al frontend');
        } else {
          console.log('¡Audio descargado y enviado exitosamente al frontend!');
          // Eliminar el archivo de audio después de enviarlo
          await unlinkAsync('audio.mp3');
          console.log('¡Archivo de audio eliminado!');
        }
      });
    } catch (error) {
      console.error('Ocurrió un error al descargar el audio:', error);
      res.status(500).send('Ocurrió un error al descargar el audio');
    }
  };


  exports.descargarId = async (req, res) => {
    try {
      const {id} = req.params;

      const options = {
        output: 'audio.mp3', // Nombre del archivo de salida
        extractAudio: true, // Extrae solo el audio
        audioFormat: 'mp3', // Formato de audio
        restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
      };

      if(!id){
        return res.status(404).json({
            msg: "no existe la musica"
        })
      }

      const music = await Music.findByPk(id);
     
      if(!music){
        return res.status(404).json({msg: "no existe la musica"})
      } 
      const {url} = await Music.findOne({
        where: { id },
        attributes: ["url"]
      });

      console.log("URL-> "+url);

      await exec(url, options); // Descargar el audio
      await music.update({download:"true"})
  
      // Enviar el archivo de audio como respuesta al frontend
      res.download('audio.mp3', 'audio.mp3', async (err) => {
        if (err) {
          console.error('Ocurrió un error al enviar el archivo al frontend:', err);
          res.status(500).send('Ocurrió un error al enviar el archivo al frontend');
        } else {
          console.log('¡Audio descargado y enviado exitosamente al frontend!');
          // Eliminar el archivo de audio después de enviarlo
          await unlinkAsync('audio.mp3');
          console.log('¡Archivo de audio eliminado!');
        }
      });
    } catch (error) {
      console.error('Ocurrió un error al descargar el audio:', error);
      res.status(500).send('Ocurrió un error al descargar el audio');
    }
  };

  exports.descargarId2 = async (req, res) => {
    try {
      const {id} = req.params;

      const options = {
        output: 'audio.mp3', // Nombre del archivo de salida
        extractAudio: true, // Extrae solo el audio
        audioFormat: 'mp3', // Formato de audio
        restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
      };

      if(!id){
        return res.status(404).json({
            msg: "no existe la musica"
        })
      }

      const music = await Music.findByPk(id);
     
      if(!music){
        return res.status(404).json({msg: "no existe la musica"})
      } 
      const {url} = await Music.findOne({
        where: { id },
        attributes: ["url"]
      });

      console.log("URL-> "+url);

      await exec(url, options); // Descargar el audio
      await music.update({download:"true"})
      
      const filePath = 'audio.mp3';

  if (!path.isAbsolute(filePath)) {
    // Si la ruta no es absoluta, conviértela en absoluta
    const absolutePath = path.resolve(filePath);
    res.sendFile((absolutePath), async (err) => {
      if (err) {
        console.error('Ocurrió un error al enviar el archivo al frontend:', err);
        res.status(500).send('Ocurrió un error al enviar el archivo al frontend');
      } else {
        console.log('¡Audio descargado y enviado exitosamente al frontend!');
        // Eliminar el archivo de audio después de enviarlo
        await unlinkAsync('audio.mp3');
        console.log('¡Archivo de audio eliminado!');
      }
    });
    
  } else {
    res.sendFile((filePath), async (err) => {
      if (err) {
        console.error('Ocurrió un error al enviar el archivo al frontend:', err);
        res.status(500).send('Ocurrió un error al enviar el archivo al frontend');
      } else {
        console.log('¡Audio descargado y enviado exitosamente al frontend!');
        // Eliminar el archivo de audio después de enviarlo
        await unlinkAsync('audio.mp3');
        console.log('¡Archivo de audio eliminado!');
      }
    });
  }


      
      // Enviar el archivo de audio como respuesta al frontend
      

    } catch (error) {
      console.error('Ocurrió un error al descargar el audio:', error);
      res.status(500).send('Ocurrió un error al descargar el audio');
    }
  };

