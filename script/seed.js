'use strict'

const db = require('../server/db')
const {User, Event, Prompt, Interaction} = require('../server/db/models')
const userData = require('./users.json')
const eventData = require('./events.json')
const promptData = require('./prompts.json')
const interactionData = require('./interactions.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(userData.map(user => User.create(user)))
  console.log(`seeded ${userData.length} users`)

  await Promise.all(eventData.map(event => Event.create(event)))
  console.log(`seeded ${eventData.length} events`)

  await Promise.all(promptData.map(prompt => Prompt.create(prompt)))
  console.log(`seeded ${promptData.length} prompts`)

  const users = await Promise.all([
    User.findById(3),
    User.findById(4),
    User.findById(5),
    User.findById(6)
  ])

  const eventIds = [1, 2, 3, 4]

  await Promise.all(users.map(user => user.setEvents(eventIds)))
  console.log(`seeded ${eventIds.length} users at events`)

  await Promise.all(interactionData.map(int => Interaction.create(int)))

  console.log(`seeded ${interactionData.length} interactions`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
