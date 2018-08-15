const router = require('express').Router()
const {Event, User, Interaction} = require('../db/models')
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
    canOnlyBeUsedBy('admin', 'participant', 'self')
    if (req.user) {
      const events = await Event.findAll(
        {
          include: [User]
        },
        {where: {id: req.user.id}}
      )
      res.send(events)
    } else {
      res.send('Cannot grant access to events')
    }
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
    //add user to the event
    const currentUser = await User.findById(req.user.id)
    newEvent.addUser(currentUser)
    res.send(newEvent)
  } catch (err) {
    next(err)
  }
})

/*
      * Event Init - Creates interactions for each player, joins pairs and adds a round number
      */
router.post('/:eventId/interactions', async (req, res, next) => {
  try {
    canOnlyBeUsedBy('admin', 'self')
    /*
            Find the target event and eager load Users
          */
    const eventInfo = await Event.findById(req.params.eventId, {
      include: [{model: User}]
    })
    /*
            Extract Users
          */
    const users = eventInfo.Users
    /*
           Formulate Pairs
        */
    let interactions = []
    let pairs = []

    for (let i = 0; i < users.length; i++) {
      for (let j = 1; j < users.length - i; j++) {
        //For each User, create a pair with all of the following users in the the array
        let entry = [users[i], users[i + j]]
        pairs.push(entry)
      }
    }

    /*
        Group into Rounds and Create Interaction Instances
    */
    for (let roundNum = 0; roundNum < pairs.length / 2; roundNum++) {
      /*
        For each round, take a pair from the start of the pairs array and a pair from the end of the pairs array
        Create the instance with round number
      */
      const interactionFromStart = await Interaction.create({
        round: roundNum + 1,
        aId: pairs[roundNum][0].id,
        bId: pairs[roundNum][1].id,
        eventId: eventInfo.id,
        promptId: roundNum + 1
      })
      const interactionFromEnd = await Interaction.create({
        round: roundNum + 1,
        aId: pairs[pairs.length - (1 + roundNum)][0].id,
        bId: pairs[pairs.length - (1 + roundNum)][1].id,
        eventId: eventInfo.id,
        promptId: roundNum + 1
      })
      interactions.push(interactionFromStart, interactionFromEnd)
    }
    res.send(interactions)
  } catch (err) {
    next(err)
  }
})
