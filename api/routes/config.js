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
    res.json(data)
  } catch(error) {
    console.log('error save journal week :>> ', error)
  }
})

router.post('/reset-password', auth, async (req, res) => {
  try {
    console.log("a ver que llegaaaaa ", req.body);
    const userDB = await User.findOne({ email: req.user.email })
		if(!userDB) {
      return res.json({ 
        success: false,
				error: 'Usuario incorrecto'
			})
    }
    const match = await bcrypt.compare(req.body.old_password, userDB.password)
    console.log('match :>> ', match);
		if(!match) {
      return res.json({ 
        success: false,
				error: 'Contraseña no coincidentes'
			})
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.new_password, salt);
    await User.findOneAndUpdate({ email: req.user.email }, { password:hash })
    console.log('userDB :>> ', userDB);
    res.json({ 
      success: true
    })
  } catch(error) {
    console.log('error reset password :>> ', error)
  }
})

router.post('/create-user', auth, async (req, res) => {
  console.log(req.body);
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
    console.log(saveUser);
  } else {
    console.log('Ya existe el usuario');
    return res.json({ 
      success: false,
      message: 'Ya existe el usuario'
    })
  }
  res.json({ 
    success: true,
    message: 'Usuario creado'
  })
})

module.exports = router;