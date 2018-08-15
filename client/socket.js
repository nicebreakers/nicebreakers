import io from 'socket.io-client'

const socket = io(window.location.origin)
// import {EVENT_STARTED, NEXT_ROUND} from '../server/socket/events'

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
