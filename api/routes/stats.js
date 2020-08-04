const express = require('express');
const router = express.Router();
const fspromises = require('../helpers/fspromises');
const request = require('../helpers/request');
const { auth } = require('../helpers/auth');

const getDate = today => {
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  if (month < 10) return `${day}-0${month}-${year}`
  else return `${day}-${month}-${year}`
}

router.get('/', auth, async (req, res) => {
  try {
    const mail = req.user.email;
    const today = getDate(new Date());

    const file = `./data/${mail}/${today.split('-')[2]}-${today.split('-')[1]}.json`;

    //await startNewMonth(file, mail);
    if (fspromises.checkFileExists(file)) {
      const read = await fspromises.readPromise(file);
      const data = await JSON.parse(read);
      res.json(data);
    }
  } catch(error) {
    res.json(error);
    console.log('error get page:>> ', error);
  }
})

router.get('/users', auth, async (req, res) => {
  try {
    const mail = req.user.email;
    const today = getDate(new Date());

    const file = `./data/${mail}/${today.split('-')[2]}-${today.split('-')[1]}.json`;

    const users = await fspromises.files('./data')

    res.json(users);
  } catch(error) {
    res.json(error);
    console.log('error get page:>> ', error);
  }
})

module.exports = router;