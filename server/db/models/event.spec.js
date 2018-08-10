const {expect} = require('chai')
const db = require('../index')
const Event = db.model('Event')

describe('Event model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    it('has a name', async () => {
      try {
        await Event.create({})
      } catch (err) {
        expect(err.message).to.equal(
          'notNull Violation: Event.name cannot be null'
        )
      }
    })
    it('name is not empty', async () => {
      try {
        await Event.create({name: ''})
      } catch (err) {
        expect(err.message).to.equal(
          'Validation error: Validation notEmpty on name failed'
        )
      }
    })
  })
})
