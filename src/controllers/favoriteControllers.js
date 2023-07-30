const Favorite = require("../models/favorites");
const Video = require("../models/Video");

exports.getAll = async (req, res) => {
  try {
    const favorite = await Favorite.findAll();
    res.json({ msg: "exitoso", result: favorite });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving Favorite", error: error });
  }
};

exports.insert = async (req, res) => {
  try {
    let { name, type, idUser, idMusic, idVideo } = req.body;

    idMusic = null;

    if (!idUser || !type || !name) {
      return res.status(500).json({ msg: "uno o mas campos vacios" });
    }
    let favorite;

    favorite = await Favorite.create({
      name: name,
      type: type,
      idUser: idUser,
      idMusic: idMusic,
      idVideo: idVideo,
    });

    res.status(201).json({ msg: "operacion exitosa", result: favorite });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al insertar", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({ msg: "digite el id" });
    }
    const favorite = await Favorite.findByPk(id);

    if (!favorite) {
      return res.status(404).json({ msg: "favorite no encontrado" });
    }

    res.status(200).json({ msg: "exitoso", result: favorite });
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
    if (!id) {
      return res.status(500).json({
        msg: "digite el id",
      });
    }
    const favorite = await Favorite.findByPk(id);
    if (!favorite) {
      return res.status(404).json({
        msg: "No se encontro el favorite",
      });
    }

    await favorite.destroy();

    res.status(200).json({ msg: "operacion exitosa" });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error: error.message,
    });
  }
};

exports.getByVideo = async (req, res) => {
  try {
    const { idUser, name } = req.query;

    if (!idUser || !name) {
      return res.status(400).json({
        msg: "uno o mas campos vacios",
      });
    }

    const favorites = await Favorite.findAll({
      where: {
        name: name,
        idUser: idUser,
      },
      attributes: ["idVideo"],
    });

    if (!favorites) {
      return res.status(404).json({
        msg: "No se encontro el favorite",
      });
    }
    const idVideoss = favorites.map((favorite) => favorite.idVideo);

    let Videos = [];

    for (let i = 0; i < idVideoss.length; i++) {
      const videoData = await Video.findAll({
        where: {
          id: idVideoss[i],
        },
      });
      // Utilizamos el operador de propagación para agregar los elementos individuales
      Videos.push(...videoData);
    }

    res.status(200).json({ msg: "ok", data: Videos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteByVideo = async (req, res) => {
    try {
      const { idUser, idVideo ,name} = req.query;
  
      if (!idUser || !idVideo || !name) {
        return res.status(400).json({
          msg: "uno o mas campos vacios",
        });
      }
  
      const favorites = await Favorite.findOne({
        where: {
          idVideo: idVideo,
          idUser: idUser,
          name:name
        }
      });
    
      if(!favorites){
        return res.status(404).json({
            msg: "no existe el video",
          });
      }
      await favorites.destroy();
  
      res.status(200).json({ msg: "operación exitosa"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.deleteByVideoTotal = async (req, res) => {
    try {
      const { idUser, idVideo } = req.query;
  
      if (!idUser || !idVideo ) {
        return res.status(400).json({
          msg: "uno o mas campos vacios",
        });
      }
  
      const favorites = await Favorite.findOne({
        where: {
          idVideo: idVideo,
          idUser: idUser
        }
      });
    
      if(!favorites){
        return res.status(404).json({
            msg: "no existe el video",
          });
      }
      await favorites.destroy();
  
      res.status(200).json({ msg: "operación exitosa"});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.deletePlayist = async (req, res) => {
    try {
      const {name } = req.query;
  
      if (!name) {
        return res.status(400).json({
          msg: "uno o mas campos vacios",
        });
      }
  
      const favorites = await Favorite.destroy({
        where: {
          name: name
        }
      });
    
      if(!favorites){
        return res.status(404).json({
            msg: "no existe el video",
          });
      }
  
      res.status(200).json({ msg: "operación exitosa",data:favorites});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.verify = async (req, res) => {
    try {
      const {idVideo } = req.query;
  
      if (!idVideo) {
        return res.status(400).json({
          msg: "uno o mas campos vacios",
        });
      }
  
      const favorites = await Favorite.findOne({
        where: {
          idVideo: idVideo
        }
      });
    
      if(!favorites){
        return res.status(200).json({
            msg: false,
          });
      }
  
      res.status(200).json({ msg:true});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
