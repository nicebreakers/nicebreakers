const router = require('express').Router()
const canOnlyBeUsedBy = require('./authMiddleware')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const auth = {
  auth: {api_key: process.env.MAILGUN_API_KEY, domain: 'nicebreakers.fun'}
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth))

const sendReports = messages =>
  Promise.all(
    messages.map(({to, html}) =>
      nodemailerMailgun.sendMail({
        from: 'reporter@nicebreakers.fun',
        'h:Reply-To': 'no-reply@nicebreakers.fun',
        subject: 'Your Nicebreakers Report' + to,
        to: 'test@pck.email',
        html
      })
    )
  )

router
  .route('/')
  .all(canOnlyBeUsedBy('leader', 'admin'))
  .post((req, res, next) =>
    sendReports(req.body.messages)
      .then(() => res.sendStatus(200))
      .catch(next)
  )

module.exports = router
