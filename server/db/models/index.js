const User = require('./user')
const Event = require('./event')
const Prompt = require('./prompt')
const PromptType = require('./promptType')
const Interaction = require('./interaction')

User.belongsToMany(Event, {through: 'UsersAtEvents'})
Event.belongsToMany(User, {through: 'UsersAtEvents'})
User.belongsToMany(User, {
  through: {
    model: Interaction,
    unique: false
  },
  as: 'Pairs',
  foreignKey: 'aId',
  otherKey: 'bId',
  foreignKeyConstraint: false
})

Interaction.belongsTo(Event, {foreignKey: 'eventId'})
Interaction.belongsTo(Prompt, {foreignKey: 'promptId'})
PromptType.hasOne(Prompt, {as: 'type'})

module.exports = {
  User,
  Event,
  Prompt,
  PromptType,
  Interaction
}
