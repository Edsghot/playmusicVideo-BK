const Favorite = require("../models/favorites")


exports.getAll = async (req,res) =>{
    try{
        const favorite = await Favorite.findAll();
        res.json({msg: "exitoso",result: favorite});
    }catch(error){
        res.status(500).json({message: 'Error retrieving Favorite',error: error})
    }
}

exports.insert = async(req,res)=>{
    try{
        let {name,type,idUser,idMusic,idVideo} = req.body;
        

        if(!idUser||!type||!name){
            return res.status(500).json({msg: 'uno o mas campos vacios'})
        }
        let favorite;
        if(type === 2){
           
            favorite = await Favorite.create({name:name,type:type,idUser:idUser,idVideo:idVideo});
        }else{   

            favorite = await Favorite.create({name:name,type:type,idUser:idUser,idMusic:idMusic});
        }

        res.status(201).json({msg: "operacion exitosa",result:favorite})
    }catch(error){
        res.status(500).json({message: "Error al insertar",error: error.message})
    }
}

exports.getById = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(500).json({msg:'digite el id'})
        }
        const favorite = await Favorite.findByPk(id);

        if(!favorite){
            return res.status(404).json({msg: "favorite no encontrado"})
        }

        res.status(200).json({msg:"exitoso",result:favorite})
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}

exports.delete = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(500).json({
                msg: "digite el id"
            })
        }
        const favorite = await Favorite.findByPk(id);
        if(!favorite){
            return res.status(404).json({
                msg: "No se encontro el favorite"
            })
        }

        await favorite.destroy();

        res.status(200).json({msg:"operacion exitosa"})
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}
