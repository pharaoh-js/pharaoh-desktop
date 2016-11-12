import React, { Component, PropTypes } from 'react'
import Header from './Header'
import HowTo from './HowTo'
import Team from './Team'
import Stack from './Stack'
import GettingStarted from './GettingStarted'

const { Firebase } = global
const BASEURL = 'https://pharaohjs.firebaseio.com/session/'

export default class Landing extends Component {
  static propTypes = {
    history: PropTypes.shape({
      pushState: PropTypes.func
    })
  }

  initFirebase = (projectName = 'Project Name') => {
    const ref = new Firebase(BASEURL)
    const projectRef = ref.push({
      projectName: projectName
    , default: { fileName: 'gettingStarted.js', key: 'default' }
    })
    return projectRef.key()
  }
  startSession = (projectName) => {
    const key = this.initFirebase(projectName)
    this.props.history.pushState(null, `/app/w/${key}`)
  }
  render () {
    return (
      <div className="container">
        <Header />
        <HowTo />
        <GettingStarted startSession={this.startSession} />
        <Team />
        <Stack />
      </div>
    )
  }
}
