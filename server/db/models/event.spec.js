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
  describe('instance methods', () => {
    beforeEach(async () => {
      await Event.create({
        name: 'Test Event',
        date: new Date(2017, 0, 1)
      })
      await Event.create({
        name: 'Test Event2',
        date: new Date(new Date() - 2 * 24 * 60 * 60 * 1000)
      })
    })
    it('FindByName', async () => {
      const event = await Event.findByName('Test Event')

      expect(event).to.be.an('array')
      expect(event[0].name).to.be.equal('Test Event')
    })

    // it('Find Events within Past Month', async () => {
    //   const event = await Event.findRecent()
    //   console.log(event)
    //   expect(event).to.be.an('array')
    //   expect(event[0].name).to.be.equal('Test Event2')
    // })
  })
