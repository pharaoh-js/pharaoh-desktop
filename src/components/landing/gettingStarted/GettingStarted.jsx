import React     from 'react'
import InlineCss from 'react-inline-css'
const stylesheet = require('!css!less!./gettingStarted.less').toString()

const GettingStarted = React.createClass({
  getInitialState(){return {sessionName: 'New Session'}},
  sessionNameChange(e) {
    this.setState({ sessionName: e.target.value })
  },
  handleSubmit (e) {
    e.preventDefault()
    let sessionName = this.state.sessionName
    this.props.startSession(sessionName);
  },
  render() {
    return (
      <InlineCss componentName="GettingStarted" stylesheet={stylesheet}>
        <div className="container">
          <div className="header">Getting Started</div>
          <div className="option1">
            <big> &mdash; Start new session using the browser editor.</big>
            <img src="images/pharaohclient.png"></img>
            <div className="start-session">
              <big>Start new Session</big>
              <form onSubmit={this.handleSubmit}>
                <input
                  onChange={this.sessionNameChange}
                  style={{width:'60%'}}
                  placeholder="Optional session name..." type="text"
                />
                <input className="btn" type="submit" value="Go" />
              </form>
              <p>Launch Pharaoh browser-based editor and invite. Start a new session above, or join a session at the top of the page.
              </p>
            </div>
          </div>
          <div className="option1">
            <big> &mdash; Or, install the Pharaoh desktop app.</big>
            <img src="images/desktop.png"></img>
            <div className="desktop">
              <span className="npmInstall">npm i -g pharaoh-nwjs</span>
              <p>This option gives you the access to save files locally, recommended for instructors. Just install our desktop app using npm (see above).</p>
            </div>
          </div>
        </div>
      </InlineCss>
    )
  }
})

export default GettingStarted

