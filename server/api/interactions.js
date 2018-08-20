const router = require('express').Router()
const {Interaction} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
const pd = require('paralleldots')
pd.apiKey = process.env.PARALLELDOTS_KEY
module.exports = router

//Put Route for Interaction Input. TODO: Account for User Input Score
router.put(
  '/:interactionId',
  canOnlyBeUsedBy('admin', 'participant', 'self'),
  async (req, res, next) => {
    try {
      const {round, aInput, bInput} = req.body
      //determine which participant the userInput belongs to
      const userInput = aInput || bInput
      //If neither a or b, throw an exception
      if (!userInput) throw Error('No input submitted')

      const interaction = await Interaction.findById(req.params.interactionId)
      const {aId, bId} = interaction

      //Check the Round
      if (+round !== +interaction.round)
        throw Error('Round does not match the interaction round')

      //Get a stringified sentiment score for the userInput
      const sentimentScore = await pd.sentiment(userInput)
      const emotionScore = await pd.emotion(userInput)

      const scoreArray = [sentimentScore, emotionScore]
      //Check to see if the user is either a or b
      if (req.user.id === aId) {
        await interaction.update({aInput: userInput, aScore: scoreArray})
      } else if (req.user.id === bId) {
        await interaction.update({bInput: userInput, bScore: scoreArray})
      }
      res.json(interaction)
    } catch (err) {
      next(err)
    }
  }
)

router.get(
  '/:interactionId/scores',
  canOnlyBeUsedBy('admin', 'leader'),
  async (req, res, next) => {
    const interaction = await Interaction.findById(req.params.interactionId)
    const scores = {a: {}, b: {}}
    const {aScore, bScore} = interaction
    if (aScore) {
      scores.a.sentiment = JSON.parse(interaction.aScore[0])
      //Account for comma and missing closing braces for emotion string responses
      scores.a.emotion = JSON.parse(interaction.aScore[1].slice(0, -2) + '}}')
    }
    if (bScore) {
      scores.b.sentiment = JSON.parse(interaction.bScore[0])

      scores.a.emotion = JSON.parse(interaction.bScore[1].slice(0, -2) + '}}')
    }

    res.json(scores)
  }
)
