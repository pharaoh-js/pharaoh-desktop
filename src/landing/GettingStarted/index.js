import React, { Component, PropTypes } from 'react'
import styles from './styles.css'

export default class GettingStarted extends Component {
  static propTypes = {
    startSession: PropTypes.func
  }

  state = { sessionName: 'New Session' }

  sessionNameChange = (e) => {
    this.setState({sessionName : e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const sessionName = this.state.sessionName
    this.props.startSession(sessionName)
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.header}>Getting Started</div>
        <div className={styles.option1}>
          <span className={styles.big}>
            Start a new session using the browser editor.
          </span>
          <img src="images/pharaohclient.png" />
          <div className={styles.startSession}>
            <span className={styles.big}>Start New Session</span>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.sessionNameChange}
                style={{width : '60%'}}
                placeholder="optional session name"
                type="text"
              />
              <input
                className={styles.btn}
                type="submit"
                value="Start!"
              />
            </form>
            <p>
              Launch the browser-based Pharaoh editor and send invitations.
              Start a new session above, or join an existing session at the top of the page.
            </p>
          </div>
        </div>
        <div className={styles.option1}>
          <span className={styles.big}>Or, install the Pharaoh desktop app.</span>
          <img src="images/desktop.png" />
          <div className={styles.desktop}>
            <span className={styles.npmInstall}>npm i -g pharaoh</span>
            <p>
              Run Pharaoh from the desktop! Get all the benefits of working with a desktop app and
              staying out of the browser.
              Just install using NPM and run with the command <code className={styles.command}>pharaoh</code>.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
