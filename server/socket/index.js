const {
  REQUEST_NEXT_ROUND,
  START_EVENT,
  ROOM,
  EVENT_STARTED,
  EVENT_PREFIX,
  END_EVENT,
  EVENT_ENDED,
  NEXT_ROUND
} = require('./events')

let user
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on(ROOM, ({room, userId}) => {
      // Nobody can belong to more than one room at a time.
      if (socket.room) {
        console.log(`Socket ${socket.id} is leaving ${socket.room}`)
        socket.leave(socket.room)
      }
      // Record the room for the socket so we can look it up later.
      socket.room = room

      // Subscribe this socket to this room.
      socket.join(room)
      console.log(
        `Socket ${socket.id}/User ${userId} is joining ${socket.room}`
      )

      // socket.emit('USER_JOINED', userId)
      // console.log(`User ${userId}, sent`)
    })

    socket.on(START_EVENT, ({eventId}) => {
      console.log(`Signal received to start eventId=${eventId}`)
      io.to(EVENT_PREFIX + eventId).emit(EVENT_STARTED, {eventId})
    })

    socket.on(END_EVENT, ({eventId}) => {
      console.log(`Signal received to end eventId=${eventId}`)
      io.to(EVENT_PREFIX + eventId).emit(EVENT_ENDED, {eventId})
    })

    socket.on(REQUEST_NEXT_ROUND, ({eventId, round}) => {
      console.log(
        `Signal received to start next round in eventId=${eventId} and round ${round}`
      )
      io.to(EVENT_PREFIX + eventId).emit(NEXT_ROUND, {eventId, round})
    })

    socket.on('user joined room', ({eventId, message}) => {
      console.log(`got ${message.email} and id ${message.id}`)
      user = message
      io.to(EVENT_PREFIX + eventId).emit('USER_JOINED', message)
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user left', {user})
      console.log(`User ${user} has left`)

      console.log(`Connection ${socket.id} has left the building`)

      // socket.emit('user left', {userObject:user})
    })
  })
}
