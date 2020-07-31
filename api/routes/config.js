const express = require('express');
const router = express.Router();
const fspromises = require('../helpers/fspromises');
const request = require('../helpers/request');
const { auth } = require('../helpers/auth');

const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

router.get('/', auth, async (req, res) => {
  try {
    const { data } = await request.getData(req, res);
    res.json(data.config.journal)
  } catch(error) {
    console.log('error config :>> ', error)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { data, file } = await request.getData(req, res);

    const fileUserTemplate = `./data/${req.user.email}/user-template.json`

    data.config.journal = req.body

    await fspromises.writePromise(file, JSON.stringify(data, null, 2))
    await fspromises.writePromise(fileUserTemplate, JSON.stringify(data, null, 2))
    res.json({
      success: true,
      message: 'Jornada laboral actualizada'
    })
  } catch(error) {
    console.log('error save journal week :>> ', error)
  }
})

router.post('/reset-password', auth, async (req, res) => {
  try {
    const userDB = await User.findOne({ email: req.user.email })
		if(!userDB) {
      return res.json({ 
        success: false,
				message: 'Usuario incorrecto'
			})
    }
    const match = await bcrypt.compare(req.body.old_password, userDB.password)
		if(!match) {
      return res.json({ 
        success: false,
				message: 'La contraseña actual no es correcta'
			})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.new_password, salt);
    await User.findOneAndUpdate({ email: req.user.email }, { password:hash })
    res.json({ 
      success: true,
      message: 'Contraseña cambiada correctamente'
    })
  } catch(error) {
    console.log('error reset password :>> ', error)
  }
})

router.post('/create-user', auth, async (req, res) => {
  const dir = `./data/${req.body.email}`;

  if (fspromises.createDir(dir)){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      'email': req.body.email,
      'password': hash,
      'name': req.body.name,
      'role': req.body.role
    });
    const read = await fspromises.readPromise(`./data/user-template.json`)
    const data = await JSON.parse(read)
    const saveUser = await newUser.save();
    data.id = saveUser._id
    data.email = saveUser.email
    data.name = saveUser.name
    data.role = "USER"
    await fspromises.writePromise(`./data/${req.body.email}/user-template.json`, JSON.stringify(data, null, 2))
    return res.json({ 
      success: true,
      message: `Usuario ${req.body.email} creado correctamente`
    })
  } else {
    return res.json({ 
      success: false,
      message: `Ya existe un usuario con este correo ${req.body.email}`
    })
  }
  res.json({ 
    success: true,
    message: 'Usuario creado'
  })
})

module.exports = router;