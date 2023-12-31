const Video = require("../models/Video");
const { exec } = require("youtube-dl-exec");
const fs = require("fs");
const util = require("util");
const unlinkAsync = util.promisify(fs.unlink);

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

    const download = false;
    const state = false;

    if (!name || !description || !url) {
      return res.status(400).json({ msg: "uno o mas campos vacios" });
    }
    const video = await Video.create({ name, description, url,download,state });

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
    const { name, description, url ,state} = req.body;

    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({
        msg: "no hay Video",
      });
    }

    if (!name || !description || !url ) {
      return res.status(400).json({
        msg: "uno o mas campos vacios",
      });
    }

    const update = await video.update({ name, description, url,state });

   return res.status(201).json({ msg: "operacion exitosa!", result: update });
  } catch (error) {
    return res.status(500).json({
      msg: "error",
      error: error.message,
    });
  }
};


exports.descargar = async (req, res) => {
  try {
    const { url ,name} = req.body;

    const options = {
      output: name+".mp4",
      restrictFilenames: true,
    };

    if(!url){
      return res.status(404).json({
        msg: "no existe url para este video"
      })
    }

      await exec(url, options);

      const filePath = name+".mp4.webm";

      if (!fs.existsSync(filePath)) {
        throw new Error(
          "El archivo de video no se encontró en la ubicación esperada"
        );
      }

      res.download(filePath, "video.mp4", async (err) => {
        if (err) {
           return res
            .status(500)
            .send("Ocurrió un error al enviar el archivo al frontend");
        } else {
          await unlinkAsync(filePath);
        }
      });
      
  } catch (error) {
    res.status(500).send("Ocurrió un error al descargar el video");
  }
};


exports.descargarId = async (req, res) => {
  try {
    const { id } = req.params;


    if (!id) {
     return res.status(500).json({
        msg: "digite el ID",
      });
    }

    const video = await Video.findByPk(id);
    if(!video){
      return res.status(404).json({
        msg: "no existe el video"
      })
    }

    const {url,name} = await Video.findOne({
      where: { id },
      attributes: ["url","name"],
    });

    const options = {
      output: name+".mp4",
      restrictFilenames: true,
    };

    if(!url){
      return res.status(404).json({
        msg: "no existe url para este video"
      })
    }

      await exec(url, options);

      await video.update({
        download: true
      })

      const filePath = name+".mp4.webm";

      if (!fs.existsSync(filePath)) {
        throw new Error(
          "El archivo de video no se encontró en la ubicación esperada"
        );
      }

      res.download(filePath, "video.mp4", async (err) => {
        if (err) {
           return res
            .status(500)
            .send("Ocurrió un error al enviar el archivo al frontend");
        } else {
          await unlinkAsync(filePath);
        }
      });
      
  } catch (error) {
    res.status(500).send(error.message);
  }
};
