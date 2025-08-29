const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

async function register(req, res) {
  const { firstname, lastname, password, email } = req.body;

  if (!email) {
    res.status(400).send({ msg: 'El email es obligatorio' });
    return;
  }

  if (!password) {
    res.status(400).send({ msg: 'La contraseña es obligatoria' });
    return;
  }

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    role: 'user',
    active: true,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  try {
    await user.save();
    res.status(200).send({ msg: 'Usuario Guardado' });
  } catch (err) {
    res
      .status(500)
      .send({ msg: `Error al guardar el usuario en la base de datos: ${err}` });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).send({ msg: 'El email es obligatorio' });
    return;
  }

  if (!password) {
    res.status(400).send({ msg: 'La contraseña es obligatoria' });
    return;
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      res.status(400).send({ msg: 'Contraseña Incorrecta ' });
    } else if (!user.active) {
      res.status(401).send({ msg: 'Usuario no autorizado o no activo' });
    } else {
      res.status(200).send({ token: jwt.createAccessToken(user) });
    }
  } catch (err) {
    res.status(500).send({ msg: 'Usuario no encontrado :/' });
  }
}

module.exports = {
  register,
  login,
};
