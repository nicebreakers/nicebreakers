const router = require('express').Router()
const {Op} = require('sequelize')
const {Interaction, User, Event} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
const pd = require('paralleldots')
pd.apiKey = process.env.PARALLELDOTS_KEY
module.exports = router

router
  .route('/event/:eventId')
  .all(canOnlyBeUsedBy('admin', 'leader'))
  .get(async (req, res, next) => {
    try {
      const {Users} = await Event.findById(+req.params.eventId, {
        include: [User]
      })

      const ints = await Interaction.findAll({
        where: {eventId: +req.params.eventId}
      })

      let response = Users.reduce((acc, user) => {
        const {id, firstName, lastName, email, imageURL} = user.dataValues
        return {
          ...acc,
          [id]: {id, firstName, lastName, email, imageURL, interactions: []}
        }
      }, {})

      ints.forEach(int => {
        const {aId, bId} = int.dataValues
        response[aId].interactions.push(int.dataValues)
        response[bId].interactions.push(int.dataValues)
      })

      res.json(response)
    } catch (err) {
      next(err)
    }
  })

//Put Route for Interaction Input.
router
  .route('/:interactionId')
  .put(
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
        const sentimentResponse = await pd.sentiment(userInput)
        let sentimentScore = JSON.parse(sentimentResponse)
        sentimentScore = Math.ceil(sentimentScore.probabilities.positive * 100)
        //Check to see if the user is either a or b
        if (req.user.id === aId) {
          await interaction.update({aInput: userInput, aScore: sentimentScore})
        } else if (req.user.id === bId) {
          await interaction.update({bInput: userInput, bScore: sentimentScore})
        }
        res.json(interaction)
      } catch (err) {
        next(err)
      }
    }
  )
