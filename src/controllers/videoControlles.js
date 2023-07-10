const Video = require("../models/Video");
const { exec } = require("youtube-dl-exec");
const fs = require("fs");
const axios = require("axios");
const ytdl = require("ytdl-core");

exports.getAll = async (req, res) => {
  try {
    const video = await Video.findAll();
    res.json({ msg: "exitoso", result: video });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving video", error: error });
  }
};

exports.insert = async (req, res) => {
  try {
    const { name, description, url } = req.body;
    if (!name || !description || !url) {
      res.status(400).json({ msg: "uno o mas campos vacios" });
    }
    const video = await Video.create({ name, description, url });

    res.status(201).json({ msg: "operacion exitosa", result: video });
  } catch (error) {
    res.status(500).json({ message: "Error al insertar", error });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ msg: "video no encontrado" });
    }

    res.status(200).json({ msg: "exitoso", result: video });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({
        msg: "No se encontro el video",
      });
    }

    await video.destroy();

    res.status(200).json({ msg: "operacion exitosa" });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, url } = req.body;

    const video = await Video.findByPk(id);
    if (!video) {
      res.status(404).json({
        msg: "no hay Video",
      });
    }

    if (!name || !description || !url) {
      res.status(400).json({
        msg: "uno o mas campos vacios",
      });
    }

    const update = await video.update({ name, description, url });

    res.status(201).json({ msg: "operacion exitosa!", result: update });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error: error.message,
    });
  }
};

exports.eliminarcache = async(req,res)=>{
   try{
    fs.unlinkSync("1.mp4")
    res.status(200).json({msg: "ok"})
   }catch(e){
    res.status(500).json({msg: "error"})
   }
}

exports.descargar = async (req, res) => {
    try {

        const { url } = req.body;
       
      const options = {
        output: "1.mp4", // Nombre del archivo de salida
        restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
      };
  
      const file = await exec(url, options);
  
      const stream = fs.createReadStream("1.mp4");
  
      res.set({
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=video.mp4",
      });
  
      stream.pipe(res);
    } catch (error) {
      console.error("Ocurrió un error al descargar el video:", error);
      res.status(500).json({
        msg: "Error al descargar el video",
        error: error.message,
      });
    }
  };


exports.descargarVideo = async (req, res) => {
  try {
    const videoUrl = "https://www.youtube.com/watch?v=Ib5rYkMxI64";

    res.set({
      "Content-Type": "video/mp4",
      "Content-Disposition": "attachment; filename=video.mp4",
    });

    ytdl(videoUrl, { format: "mp4" }).pipe(res);
  } catch (error) {
    console.error("Ocurrió un error al descargar el video:", error);
    res.status(500).json({
      msg: "Error al descargar el video",
      error: error.message,
    });
  }
};
