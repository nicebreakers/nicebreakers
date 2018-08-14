const router = require('express').Router()
const {User} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
module.exports = router

router
  .route('/')
  .all(canOnlyBeUsedBy('admin'))
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'role', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

router
  .route('/:userId')
  .all(canOnlyBeUsedBy('admin', 'self'))
  .get((req, res, next) => {
    User.findById(req.params.userId)
      .then(user => res.json(user))
      .catch(next)
  })
  .put((req, res, next) => {
    const {firstName, lastName, email, role} = req.body
    User.findById(req.params.userId)
      .then(foundUser =>
        foundUser.update(
          {firstName, lastName, email, role},
          {
            returning: true,
            attributes: ['id', 'firstName', 'lastName', 'role', 'email']
          }
        )
      )
      .then(updatedUser => res.json(updatedUser))
      .catch(next)
  })
