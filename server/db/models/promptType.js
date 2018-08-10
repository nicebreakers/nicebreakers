const Sequelize = require('sequelize')
const db = require('../db')

const PromptType = db.define('PromptType', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = PromptType
