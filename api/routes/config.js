const express = require('express');
const router = express.Router();
const fspromises = require('../helpers/fspromises');
const request = require('../helpers/request');
const { auth } = require('../helpers/auth');

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

module.exports = router;