import React, { Component } from 'react'
import { func, shape } from 'prop-types'
import About from './About'
import { wrapper } from './styles.css'

const { Firebase } = global
const BASEURL = 'https://pharaohjs.firebaseio.com/session/'

export default class Landing extends Component {
  static contextTypes = {
    router: shape({
      transitionTo: func.isRequired
    }).isRequired
  }

  initFirebase = (projectName) => {
    const ref = new Firebase(BASEURL)
    const projectRef = ref.push({
      default: { fileName: 'gettingStarted.js', key: 'default' }
    , projectName
    })
    return projectRef.key()
  }

  startSession = (projectName = 'New Project') => {
    const key = this.initFirebase(projectName)
    this.context.router.transitionTo(`/app/w/${key}`)
  }

  render () {
    return (
      <div className={wrapper}>
        <About startSession={this.startSession} />
      </div>
    )
  }
}
