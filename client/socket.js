import io from 'socket.io-client'

const socket = io(window.location.origin)
import {EVENT_STARTED, NEXT_ROUND} from '../server/socket/events'

socket.on('connect', () => {
  console.log('Connected!')

  socket.on(EVENT_STARTED, data => {
    console.log(`Got ${EVENT_STARTED} with payload=`, data)
    // do other stuff.
  })

  socket.on(NEXT_ROUND, data => {
    console.log(`Got ${NEXT_ROUND} with payload=`, data)
    // do other stuff.
  })
})

export default socket
