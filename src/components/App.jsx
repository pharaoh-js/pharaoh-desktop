import React, { PropTypes } from 'react'
import Viewer from './viewer/Viewer'
import Menu from './common/header/Menu'

const App = React.createClass({
  render () {
    return (
        <div>
          <Menu />
          <Viewer />
        </div>
    )
  }
})

export default App

