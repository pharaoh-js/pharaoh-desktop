import React, { Component } from 'react'
import { func } from 'prop-types'
import Team from '../Team'
import { Link } from 'react-router-dom'
import styles from './styles.css'

export default class About extends Component {
  static propTypes = {
    startSession: func
  }

  state = {
    sessionName: 'New Session'
  , project: ''
  }

  getRandomString = () =>
    Math.random().toString(36).substring(8)

  sessionNameChange = (e) => {
    this.setState({ sessionName: e.target.value })
  }

  handleProjectEntry = (e) => {
    this.setState({ project: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const sessionName = this.state.sessionName
    this.props.startSession(sessionName)
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logoWrapper}>
            <img src="/images/pharaoh.png" className={styles.logo} />
            <a className={styles.github} href="https://github.com/pharaoh-js">
              Pharaoh on GitHub
            </a>
          </div>
        </div>
        <div className={styles.aboutWrapper}>
          Pharaoh is a collaborative editor for the classroom.
          <p>
            Students: you will receive a string from your instructor. Enter this
            session code and hit 'GO!' to join the session!
          </p>
          <span>Join Existing Session:&nbsp;
            <input
              type="text"
              value={this.state.project}
              onChange={this.handleProjectEntry}
            />
          </span>&nbsp;
          <Link
            className={styles.link}
            to={`/app/r/${this.state.project || this.getRandomString()}`}>
            Go!
          </Link>
          <div className={styles.option1}>
            <p>
              Instructors: enter the desired session name (optional), hit 'Start!,' and
              share your link.  Also consider downloading the desktop app. Enjoy!
            </p>
            <div className={styles.startSession}>
              <form onSubmit={this.handleSubmit}>
                <input
                  onChange={this.sessionNameChange}
                  style={{ width : '40%' }}
                  placeholder="optional session name"
                  type="text"
                />
                <input
                  className={styles.btn}
                  type="submit"
                  value="Start!"
                />
              </form>
            </div>
          </div>
          <div className={styles.option1}>
            <div className={styles.desktop}>
              <p>
                Run Pharaoh from the desktop! Get all the benefits of working with a desktop app and
                staying out of the browser.
                Just install using NPM (<code className={styles.command}>npm i -g pharaoh</code>)
                and run with the command <code className={styles.command}>pharaoh</code>.
              </p>
            </div>
          </div>
        </div>
        <Team />
      </div>
    )
  }
}
