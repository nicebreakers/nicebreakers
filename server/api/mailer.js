const router = require('express').Router()
const canOnlyBeUsedBy = require('./authMiddleware')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const auth = {
  auth: {api_key: process.env.MAILGUN_API_KEY, domain: 'nicebreakers.fun'}
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth))

const sendReports = (eventId, messages) => {
  const mails = [...messages]

  mails.forEach(message => {
    nodemailerMailgun.sendMail(
      {
        from: 'reporter@nicebreakers.fun',
        to: message.sendTo,
        subject: 'Your Nicebreakers Report',
        'h:Reply-To': 'no-reply@nicebreakers.fun',
        html: message
      },
      function(err, info) {
        if (err) {
          console.log('Error: ' + err)
        } else {
          console.log('Response: ' + info)
        }
      }
    )
  })
}

router
  .route('/')
  .all(canOnlyBeUsedBy('leader', 'admin'))
  .post((req, res, next) => {
    sendReports(+req.body.eventId, req.body.messages)
    res.sendStatus(201)
  })

module.exports = router
