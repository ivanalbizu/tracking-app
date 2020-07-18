const express = require('express');
const router = express.Router();
const fspromises = require('../helpers/fspromises');
const request = require('../helpers/request');
const { auth } = require('../helpers/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { data, today, file } = await request.getDataTrack(req, res);
    res.json(data.tracking[today])
  } catch(error) {
    console.log('error start :>> ', error)
  }
})

router.post('/start', auth, async (req, res) => {
  try {
    const { data, today, file } = await request.getData(req, res);

    data.tracking[today] = []
    const record = {
      "type": "work",
      "time_start": req.body.time,
      "time_end": "En curso"
    }
    data.tracking[today].push(record)
    await fspromises.writePromise(file, JSON.stringify(data, null, 2))

    res.json(data.tracking[today])
  } catch(error) {
    console.log('error start :>> ', error)
  }
})

router.post('/play', auth, async (req, res) => {
  try {
    const { data, today, file } = await request.getData(req, res)
    const trackToday = data.tracking[today]
    
    data.tracking[today][trackToday.length-1]["time_end"] = req.body.time
    const record = {
      "type": "work",
      "time_start": req.body.time,
      "time_end": "En curso"
    }
    data.tracking[today].push(record);
    await fspromises.writePromise(file, JSON.stringify(data, null, 2))
    res.json(data.tracking[today])
  } catch(error) {
    console.log('error play :>> ', error)
  }
})

router.post('/pause', auth, async (req, res) => {
  try {
    const { data, today, file } = await request.getData(req, res)
    const trackToday = data.tracking[today]

    data.tracking[today][trackToday.length-1]["time_end"] = req.body.time
    const record = {
      "type": "break",
      "time_start": trackToday[trackToday.length-1].time_end,
      "time_end": "En curso"
    }
    data.tracking[today].push(record)
    await fspromises.writePromise(file, JSON.stringify(data, null, 2))

    res.json(data.tracking[today])
  } catch(error) {
    console.log('error pause :>> ', error)
  }
})

router.post('/stop', auth, async (req, res) => {
  try {
    const { data, today, file } = await request.getData(req, res)
    const trackToday = data.tracking[today]

    data.tracking[today][trackToday.length-1]["time_end"] = req.body.time
    await fspromises.writePromise(file, JSON.stringify(data, null, 2))

    res.json(data.tracking[today])
  } catch(error) {
    console.log('error stop :>> ', error)
  }
})

module.exports = router;