import React, { Component, PropTypes } from 'react'
import Mirror from './mirror'
import Settings from './settings'

export default class Wrapper extends Component {
  static propTypes = {
    hideSettings: PropTypes.func.isRequired
  , config: PropTypes.object
  , isSetting: PropTypes.bool
  , pad: PropTypes.string
  , showSettings: PropTypes.func.isRequired
  , themes: PropTypes.array.isRequired
  , updateSettings: PropTypes.func.isRequired
  }
  handleClick = (evt) => {
    const eNotClose = ['wrapper', 'settings']

    if (eNotClose.indexOf(evt.target.offsetParent.className) === -1) {
      this.props.hideSettings()
    }
  }

  render () {
    const mirror = <Mirror pad={this.props.pad} config={this.props.config} />
    const settings = this.props.isSetting
      ? <Settings
        showSettings={this.props.showSettings}
        themes={this.props.themes}
        hideSettings={this.props.hideSettings}
        updateSettings={this.props.updateSettings} />
      : null

    return (
      <div
        onClick={this.handleClick}
        className="wrapper"
        style={{
          height   : '100%'
        , position : 'relative'
        , left     : '19%'
        , width    : '81%'
        }}>
        {mirror}
        {settings}
      </div>
    )
  }
}
