const router = require('express').Router()
const {Event, User} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
module.exports = router

router.get('/all', canOnlyBeUsedBy('admin'), async (req, res, next) => {
  try {
    const events = await Event.findAll({})
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

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll(
      {
        include: [User]
      },
      {where: {id: req.user.id}}
    )
    res.send(events)
  } catch (err) {
    next(err)
  }
})

//This route takes in the entire object and changes the entire object
//Presumes that values meant to remain consistent will be passed in
router.put('/:eventId', async (req, res, next) => {
  const {name, status, description, date, location} = req.body
  try {
    const targetEvent = await Event.findById(req.params.eventId)
    //if values are not passed in through req.body, set values to null
    await targetEvent.update(
      {
        name: name || null,
        status: status || null,
        description: description || null,
        date: date || null,
        location: location || null
      },
      {returning: true}
    )
    res.send(targetEvent)
  } catch (err) {
    next(err)
  }
})

//This route Specifically changes status
router.put('/:eventId/status', async (req, res, next) => {
  try {
    const {status} = req.body
    const targetEvent = await Event.findById(req.params.eventId)
    await targetEvent.update({status}, {returning: true})
    res.send(targetEvent)
  } catch (err) {
    next(err)
  }
})

//Specifically changes the date for event
router.put('/:eventId/date', async (req, res, next) => {
  try {
    const {date} = req.body
    const targetEvent = await Event.findById(req.params.eventId)
    await targetEvent.update({date})
    res.send(targetEvent)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {name, status, description, date, location} = req.body
  try {
    const newEvent = await Event.create({
      name,
      status,
      description,
      date,
      location
    })
    res.send(newEvent)
  } catch (err) {
    next(err)
  }
})
