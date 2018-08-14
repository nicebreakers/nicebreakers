'use strict'

const db = require('../server/db')
const {User, Event} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'testAdmin@email.com', password: '123', role: 'admin'}),
    User.create({
      email: 'testLeader@email.com',
      password: '456',
      role: 'leader'
    }),
    User.create({
      email: 'testUser1@email.com',
      password: '789',
      role: 'participant'
    }),
    User.create({
      email: 'testUser2@email.com',
      password: '789',
      role: 'participant'
    }),
    User.create({
      email: 'testUser3@email.com',
      password: '789',
      role: 'participant'
    }),
    User.create({
      email: 'testUser4@email.com',
      password: '789',
      role: 'participant'
    }),
    User.create({
      email: 'testUser5@email.com',
      password: '789',
      role: 'participant'
    }),
    User.create({
      email: 'testUser6@email.com',
      password: '789',
      role: 'participant'
    }),
    User.create({
      email: 'testUser7@email.com',
      password: '789',
      role: 'participant'
    })
  ])

  console.log(`seeded ${users.length} users`)
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
