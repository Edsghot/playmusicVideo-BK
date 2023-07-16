const User = require("../models/User");

exports.getAll = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json({ msg: "exitoso", result: user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving User " });
  }
};

exports.Insert = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "uno o mas campos vacios",
      });
    }

    const users = await User.create({ name, email, password });

    res.status(200).json({ msg: "operacio exitosa" });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Uno o más campos vacíos",
      });
    }

    const user = await User.findAll({
      where: { email: email, password: password },
    });

    if (user.length === 0) {
      return res.status(404).json({
        error: "No se encontró ningún user",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      msg: "Error",
      error: error.message,
    });
  }
};

exports.loginGoogle = async (req, res) => {
  try {
    const email = req.user.email;
    const name = req.user.displayName;
    const clientID = req.user.id;
    const token = req.user.accessToken;

    const userFind = await User.findOne({ where: { password: clientID } });

    if (!userFind) {
      const user = await User.create({
        name: name,
        email: email,
        password: clientID,
      });
      res.status(200).json({ msg: "registrado", data: user, token });
    } else {
      res
        .status(200)
        .json({ msg: "ok", data: { email, name, clientID, token } });
    }
  } catch (err) {
    return res.status(500).json({
      msg: "Error",
      error: err,
    });
  }
};
exports.loginFacebook = async (req, res) => {
  try {
    const name = req.user.displayName;
    const clientID = req.user.clientID;
    const displayName = req.user.displayName;
    const photo = req.user.photo;
    const token = req.user.token;

    res
      .status(200)
      .json({ msg: "ok", data: { name, clientID, displayName, photo, token } });
  } catch (err) {
    return res.status(500).json({
      msg: "Error",
      error: err,
    });
  }
};
