const User = require('../models/User');

exports.getAll = async (req,res) =>{
    try{
        const user = await User.findAll();
        res.json({msg: "exitoso",result: user});
    }catch(error){
        res.status(500).json({message: 'Error retrieving User '})
    }
}

exports.Insert = async(req,res)=>{
  try{
    const {name,email,password} = req.body;

    if(!name || !email|| !password){
        return res.status(400).json({
            error: "uno o mas campos vacios",
        });
    }

    const users = await User.create({name,email,password});


    res.status(200).json({msg: "operacio exitosa"});
  }catch(error){
    res.status(500).json({
        msg: "error",error:error.message
    })
}
}
exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;

    if(!email||!password){
        return res.status(400).json({
            error: "uno o mas campos vacios"
        })
    }

    const user = await User.findAll({where:{email: email,password:password}});

    if(user.length === 0){
        res.status(404).json({
            error: "no se encontro estudiantes"
        })
    }
    res.status(200).json(user)
    }catch(error){
        res.status(500).json({
            msg: "error",error:error.message
        })
    }
}