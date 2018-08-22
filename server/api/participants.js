const router = require('express').Router()
const {Event, User, Interaction} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')

router.get('', canOnlyBeUsedBy('admin', 'leader'), async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
