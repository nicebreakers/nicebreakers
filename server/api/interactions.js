const router = require('express').Router()
const {Op} = require('sequelize')
const {Interaction, User, Event} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
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

//Put Route for Interaction Input. TODO: Account for User Input Score
router
  .route('/:interactionId')
  .put(
    canOnlyBeUsedBy('admin', 'participant', 'self'),
    async (req, res, next) => {
      try {
        console.log('The Body', req.body)
        const {round, aInput, bInput} = req.body
        const userInput = aInput || bInput
        console.log(round, userInput)
        const interaction = await Interaction.findById(req.params.interactionId)
        const {aId, bId} = interaction

        //Check the Round?
        if (+round !== +interaction.round)
          throw Error('Round does not match the interaction round')

        //Check to see if the user is either a or b
        if (req.user.id === aId) {
          await interaction.update({aInput: userInput})
        } else if (req.user.id === bId) {
          await interaction.update({bInput: userInput})
        }
        res.json(interaction)
      } catch (err) {
        next(err)
      }
    }
  )
