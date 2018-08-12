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
    type: Sequelize.ENUM('pending', 'in_progress', 'done'),
    defaultValue: 'pending'
  }
})

Event.findByName = function(searchName) {
  return Event.findAll({
    where: {
      name: searchName
    }
  })
}

// Event.findRecent = function() {
//   return Event.findAll({
//     where: {
//       date: {
//         $gt: new Date(Date.now() - 31 * (1000 * 60 * 60 * 24))
//       }
//     }
//   })
// }

module.exports = Event
