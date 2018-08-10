const Sequelize = require('sequelize')
const db = require('../db')

const Prompt = db.define('Prompt', {
  question: {
    type: Sequelize.TEXT
  }
})

module.exports = Prompt
