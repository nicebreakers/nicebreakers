const Sequelize = require('sequelize')
const db = require('../db')

const Interaction = db.define('Interaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  aInput: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  aInputMsec: {
    type: Sequelize.INTEGER
  },
  aScore: {
    type: Sequelize.INTEGER
  },
  bInput: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  bInputMsec: {
    type: Sequelize.INTEGER
  },
  bScore: {
    type: Sequelize.INTEGER
  },
  round: {
    type: Sequelize.INTEGER
  }
})

module.exports = Interaction
