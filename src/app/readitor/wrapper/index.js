import React, { Component } from 'react'
import { bool, object, string } from 'prop-types'
import Mirror from './mirror'
import { wrapper } from './styles.css'

export default class Wrapper extends Component {
  static propTypes = {
    config: object
  , isDark: bool.isRequired
  , pad: string
  }

  render () {
    const {
      config,
      isDark,
      pad
    } = this.props

    return (
      <div className={wrapper}>
        <Mirror theme={isDark ? 'zeemirror' : 'default'} pad={pad} config={config} />
      </div>
    )
  }
}
