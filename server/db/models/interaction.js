const Sequelize = require('sequelize')
const db = require('../db')

const Interaction = db.define('Interaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  aInput: {
    type: Sequelize.TEXT
  },
  aInputMsec: {
    type: Sequelize.INTEGER
  },
  aScore: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  bInput: {
    type: Sequelize.TEXT
  },
  bInputMsec: {
    type: Sequelize.INTEGER
  },
  bScore: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  round: {
    type: Sequelize.INTEGER
  }
})

module.exports = Interaction
