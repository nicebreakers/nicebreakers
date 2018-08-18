const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/mailer', require('./mailer'))
router.use('/events', require('./events'))
router.use('/interactions', require('./interactions'))
router.use('/profileSubmissions', require('./profileSubmissions'))
router.use('/prompts', require('./prompts'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
