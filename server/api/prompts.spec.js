const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Prompt = db.model('Prompt')

describe('Prompt routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/prompts/', () => {
    const testPrompt = 'What is your name?'
    const testPrompt2 = 'What is your favorite color?'
    const testPrompt3 = 'What would be your plan if a zombie outbreak occurred'

    beforeEach(async () => {
      const prompt = await Prompt.create({
        question: testPrompt
      })
      return prompt
    })

    beforeEach(async () => {
      const prompt = await Prompt.create({
        question: testPrompt2
      })
      return prompt
    })

    it('GET /api/prompts gets all prompts', async () => {
      const res = await request(app)
        .get('/api/prompts')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].question).to.be.equal(testPrompt)
      expect(res.body[1].question).to.be.equal(testPrompt2)
    })

    it('GET /api/prompts', async () => {
      const res = await request(app)
        .get('/api/prompts/random')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.question).to.satisfy(function(input) {
        if (input === testPrompt || input === testPrompt2) {
          return true
        } else {
          return false
        }
      })
    })

    it('POST /api/prompts', async () => {
      const res = await request(app)
        .post('/api/prompts/')
        .send({question: testPrompt3})
        .set('Accept', 'application/json')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.question).to.be.equal(testPrompt3)
    })

    it('PUT /api/prompts/:promptId', async () => {
      return request(app)
        .put('/api/prompts/1')
        .send({question: testPrompt3})
        .expect(res => {
          expect(res.body.question).to.be.equal(testPrompt3)
        })
    })

    // it('DELETE /api/prompts/:promptId', async () => {
    // 	const res = await request(app)
    // 		.delete('/api/prompts/1')
    // 		.expect(200)

    // })
  })
})
