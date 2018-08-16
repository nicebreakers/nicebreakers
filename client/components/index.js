/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as PlayerAddForm} from './player-add-form'
export {default as PlayerList} from './player-list'
export {default as PlayerSingle} from './player-single'
export {default as PlayerAdd} from './player-add'
export {default as FourOFour} from './utility-components/FourOFour'
export {default as EventCard} from './user-home/eventCard'
export {default as EventActionButton} from './user-home/eventActionButton'
export {default as LandingPage} from './landingPage'
export {default as Footer} from './footer'
export {default as ProtectedRoute} from './utility-components/protectedRoute'
export {default as EventControl} from './eventControl'
export {default as ProfileForm} from './user-home/profileForm'
export {default as InstructionsPanel} from './user-home/instructionsPanel'
export {default as Controller} from './controllers/Controller'
export {default as SingleEventPage} from './single-event'

// export {default as SubmitPhoto} from './game-forms/'
