import React from 'react'
import { connect } from 'react-redux'

import NoKey from './NoKey'

const App = ({children, blip}) => (
  <div className='App'>
    {blip.priv ? children : <NoKey />}
  </div>
)

const mapStateToProps = (store) => ({
  blip: store.blip
})

export default connect(mapStateToProps)(App)
