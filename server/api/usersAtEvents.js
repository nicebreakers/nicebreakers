const router = require('express').Router()
const {User, Event} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
module.exports = router

router.get(
  '/:eventId',
  canOnlyBeUsedBy('admin', 'leader', 'self', 'participant'),
  async (req, res, next) => {
    try {
      const events = await Event.findById(req.params.eventId, {
        include: [{model: User}]
      })
      res.json(events)
    } catch (err) {
      next(err)
    }
  }
)
router.put('/', canOnlyBeUsedBy('admin', 'leader'), async (req, res, next) => {
  try {
    const {userEmail, eventId} = req.body
    const user = await User.findOne({
      where: {
        email: userEmail
      }
    })
    if (!user) throw Error('User could not be found')
    const event = await Event.findById(eventId)
    await user.setEvents(event)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
