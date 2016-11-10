import React from 'react'
import { connect } from 'react-redux'

import Notification from '../components/Notification'

const App = ({children, playing}) => (
  <div className='App'>
    {children}
    <Notification />
  </div>
)

const mapStateToProps = function (store) {
  return {
    playing: store.tracks.playing
  }
}

export default connect(mapStateToProps)(App)
