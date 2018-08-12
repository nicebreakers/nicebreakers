const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('Event', {
  date: {
    type: Sequelize.DATE
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  location: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('pending', 'in_progress', 'done')
  }
})

module.exports = Event
