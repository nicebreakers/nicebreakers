const router = require('express').Router()
const Sequelize = require('sequelize')
const {Prompt} = require('../db/models')
module.exports = router

//get all prompts
router.get('/', async (req, res, next) => {
  try {
    const prompts = await Prompt.findAll()
    res.send(prompts)
  } catch (err) {
    next(err)
  }
})

//get a random prompt
router.get('/random', async (req, res, next) => {
  try {
    const randomPrompt = await Prompt.find({
      order: [Sequelize.fn('RANDOM')]
    })
    res.send(randomPrompt)
  } catch (err) {
    next(err)
  }
})

//add a new prompt
router.post('/', async (req, res, next) => {
  try {
    const {question} = req.body
    const newPrompt = await Prompt.create({question})
    res.send(newPrompt)
  } catch (err) {
    next(err)
  }
})

//edit an existing prompt
router.put('/:promptId', async (req, res, next) => {
  try {
    const {question} = req.body
    const {promptId} = req.params
    const targetPrompt = await Prompt.findById(promptId)

    await targetPrompt.update(
      {question},
      {
        where: {
          id: promptId
        },
        returning: true,
        plain: true
      }
    )
    res.send(targetPrompt)
  } catch (err) {
    next(err)
  }
})

//delete an existing prompt
router.delete('/:promptId', async (req, res, next) => {
  try {
    const {promptId} = req.params
    const numAffected = await Prompt.destroy({
      where: {
        id: promptId
      }
    })
    res.send(numAffected)
  } catch (err) {
    next(err)
  }
})
