import React, { PropTypes } from 'react'
import Mirror from './Mirror'

const MirrorWrapper = React.createClass({
  getInitialState () {
    return {
      pad: '/test3'
    }
  },
  render () {
    return (
      <div>
        <Mirror pad={this.props.pad} />
      </div>
    )
  }
})

export default MirrorWrapper
