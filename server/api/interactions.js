const router = require('express').Router()
const {Interaction} = require('../db/models')
const canOnlyBeUsedBy = require('./authMiddleware')
module.exports = router

//Put Route for Interaction Input. TODO: Account for User Input Score
router.put(
  '/:interactionId',
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
