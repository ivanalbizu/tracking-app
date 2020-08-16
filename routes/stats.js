const express = require('express');
const router = express.Router();
const fspromises = require('../helpers/fspromises');
const { auth } = require('../helpers/auth');


//Get all user months
router.get('/stat/:user', auth, async (req, res) => {
  try {
    const mail = req.params.user == 'me' ? req.user.email : req.params.user;

    const path = `./data/${mail}/`;

    const read = await fspromises.months(path);

    res.json(read);
  } catch(error) {
    console.log('error get all user months :>> ', error);
    res.json(error);
  }
})


//Get selected user month
router.get('/stat/:user/:month', auth, async (req, res) => {
  try {
    const mail = req.params.user == 'me' ? req.user.email : req.params.user;
    const month = req.params.month;

    const path = `./data/${mail}/${month}.json`;

    const read = await fspromises.readPromise(path);
    const data = await JSON.parse(read);
  
    res.json(data);
  } catch(error) {
    console.log('error get selected user month :>> ', error);
    res.json(error);
  }
})


//Get all Users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await fspromises.files('./data')

    res.json(users);
  } catch(error) {
    console.log('error get all users :>> ', error);
    res.json(error);
  }
})

module.exports = router;