import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Readitor from './readitor'
import Menu from './menu'

export default class App extends Component {
  static propTypes = {
    params: shape({
      role: string.isRequired
    , project: string.isRequired
    })
  }

  state = { project: 'sandbox' }

  componentWillMount () {
    this.role       = this.props.params.role
    this.projectKey = this.props.params.project
  }

  render () {
    return (
      <div>
        <Menu projectKey={this.projectKey} />
        <Readitor
          projectKey={this.projectKey}
          role={this.role}
        />
      </div>
    )
  }
}
