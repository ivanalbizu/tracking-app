require('../config/database')
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET || '8frs**t$b3r$8)-@+psi*56sdi46=wl(ec)(u$&tjy#io!62z2'
const jwtExpirySeconds = 24 * 60 * 60 //86400 seconds (1 dia)
const { auth } = require('../helpers/auth');

const signin = async (req, res) => {
  const { email, password } = req.body

	try {
		const userDB = await User.findOne({ email: email })
		if(!userDB) {
			return res.json({ 
				success: false,
				error: 'Usuario incorrecto'
			})
		}

		const match = await bcrypt.compare(password, userDB.password)
		if(!match) {
			return res.json({ 
				success: false,
				error: 'Contraseña incorrecta'
			})
		}

		const tokenOptions = {
			algorithm: 'HS256',
			expiresIn: jwtExpirySeconds
		}
		const payload = {
			user: {
				email: userDB.email,
				name: userDB.name
			}
		}
		const token = jwt.sign(payload, jwtKey, tokenOptions)

		res.json({
      token,
			email
    })

	} catch (error) {
		res.json({'error': error})
	}
}

const me = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email })
		res.json({
			'name': user.name,
			'email': user.email,
			'role': user.role
		})
  } catch (e) {
    res.json({ message: "Error in Fetching user" });
  }
}

router.post('/signin', signin)
router.get('/me', auth, me)

module.exports = router