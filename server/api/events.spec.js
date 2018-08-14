const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Event = db.model('Event')

describe('Event routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Event GET routes', () => {
    beforeEach(async () => {
      const event1 = await Event.create({
        description: 'An Event from 1995',
        name: 'My Event',
        date: new Date('December 17, 1995 03:24:00'),
        status: 'done'
      })
      const event2 = await Event.create({
        description: 'An Event from 2001',
        name: '2001 Event',
        date: new Date('December 17, 2001 03:24:00'),
        status: 'done'
      })
    })
    it('GETS all events /api/events', async () => {
      const res = await request(app)
        .get('/api/events')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
    })
    it('GET for single /api/events/:eventID', async () => {
      const res = await request(app)
        .get('/api/events/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('My Event')
      expect(res.body.status).to.equal('done')
    })
    it('GET for single, search by Name /api/events/:eventName', async () => {
      const res = await request(app)
        .get('/api/events/name/2001 Event')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('2001 Event')
      expect(res.body[0].status).to.equal('done')
    })
  })
  describe('PUT Routes', () => {
    beforeEach(async () => {
      await Event.create({
        name: 'Event To Edit',
        status: 'pending',
        description: 'Ipsum Lorae'
      })
    })
    it('changes name', async () => {
      return request(app)
        .put('/api/events/1')
        .send({name: 'EventUpdated', status: 'pending'})
        .expect(res => {
          expect(res.body.name).to.be.equal('EventUpdated')
          expect(res.body.status).to.be.equal('pending')
          //description should be set to null
          expect(res.body.description).to.be.equal(null)
        })
    })
    it('changes status', async () => {
      return request(app)
        .put('/api/events/1/status')
        .send({status: 'done'})
        .expect(res => {
          expect(res.body.status).to.be.equal('done')
        })
    })
    it('changes date', async () => {
      return request(app)
        .put('/api/events/1/date')
        .send({date: new Date('2018-02-01T00:00:00.000Z')})
        .expect(res => {
          expect(res.body.date).to.be.equal('2018-02-01T00:00:00.000Z')
        })
    })
  })
  describe('POST Routes', () => {
    it('POST /api/events', () => {
      return request(app)
        .post('/api/events')
        .send({name: 'CreatedEvent', status: 'in_progress'})
        .expect(res => {
          expect(res.body.name).to.be.equal('CreatedEvent')
          expect(res.body.status).to.be.equal('in_progress')
        })
    })
    //TODO:This will test that that instance was successfully created in DB.
    //PAUSED: Unneccesary Blocker

    // it('A post will create correct instance in the DB')
    // const res = request(app)
    //   .post('/api/events')
    //   .send({name: 'CreatedEvent', status: 'in_progress'})
    // Event.findById(1).then(event => {
    //   expect(event.name).to.be.equal('CreatedEvent')
    //   expect(event.status).to.be.equal('in_progress')
    // })
  })
})
