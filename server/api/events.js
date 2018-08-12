const router = require('express').Router()
const {Event} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll()
    res.send(events)
  } catch (err) {
    next(err)
  }
})
router.get('/:eventId', async (req, res, next) => {
  try {
    const events = await Event.findById(req.params.eventId)
    res.send(events)
  } catch (err) {
    next(err)
  }
})

router.get('/name/:eventName', async (req, res, next) => {
  try {
    const events = await Event.findByName(req.params.eventName)
    res.send(events)
  } catch (err) {
    next(err)
  }
})

//This route takes in the entire object and changes the entire object
//Presumes that values meant to remain consistent will be passed in
router.put('/:eventId', async (req, res, next) => {
  const {name, status, description, date, location} = req.body

  const targetEvent = await Event.findById(req.params.eventId)
  //if values are not passed in through req.body, set values to null
  await targetEvent.update({
    name: name || null,
    status: status || null,
    description: description || null,
    date: date || null,
    location: location || null
  })
  res.send(targetEvent)
})

//This route Specifically changes status
router.put('/:eventId/status', async (req, res, next) => {
  const {status} = req.body
  const targetEvent = await Event.findById(req.params.eventId)
  await targetEvent.update({status})
  res.send(targetEvent)
})

//Specifically changes the date for event
router.put('/:eventId/date', async (req, res, next) => {
  const {date} = req.body
  const targetEvent = await Event.findById(req.params.eventId)
  await targetEvent.update({date})
  res.send(targetEvent)
})

router.post('/', async (req, res, next) => {
  const {name, status, description, date, location} = req.body
  const newEvent = await Event.create({
    name,
    status,
    description,
    date,
    location
  })
  res.send(newEvent)
})
