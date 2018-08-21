import React, {Fragment} from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <Routes />
      </main>
      <Footer />
    </Fragment>
  )
}

export default App
