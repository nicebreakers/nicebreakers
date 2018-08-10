const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('Event', {
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Event
