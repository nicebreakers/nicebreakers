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
      const usersById = Users.reduce((acc, cur) => {
        const {id, firstName, lastName, email, imageUrl} = cur.dataValues
        acc[id] = {id, firstName, lastName, email, imageUrl}
        return acc
      }, {})

      const interactions = await Interaction.findAll({
        where: {eventId: +req.params.eventId}
      })
      const response = interactions.map(int => {
        return {
          ...int.dataValues,
          aId: usersById[int.dataValues.aId],
          bId: usersById[int.dataValues.bId]
        }
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
