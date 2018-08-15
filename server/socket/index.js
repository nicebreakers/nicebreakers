const {
  REQUEST_NEXT_ROUND,
  START_EVENT,
  ROOM,
  EVENT_STARTED,
  EVENT_PREFIX
} = require('./events')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on(ROOM, ({room}) => {
      // Nobody can belong to more than one room at a time.
      if (socket.room) {
        console.log(`Socket ${socket.id} is leaving ${socket.room}`)
        socket.leave(socket.room)
      }
      // Record the room for the socket so we can look it up later.
      socket.room = room

      // Subscribe this socket to this room.
      socket.join(room)
      console.log(`Socket ${socket.id} is joining ${socket.room}`)
    })

    socket.on(START_EVENT, ({eventId}) => {
      console.log(`Signal received to start eventId=${eventId}`)
      io.to(EVENT_PREFIX + eventId).emit(EVENT_STARTED, {})
    })

    socket.on(REQUEST_NEXT_ROUND, ({eventId}) => {
      console.log(`Signal received to start next round in eventId=${eventId}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
