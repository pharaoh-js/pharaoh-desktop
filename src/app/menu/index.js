import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './styles.css'

export default class Header extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired
  }

  state = { invite: 'click' }

  toggleCopying = () => {
    if (this.state.invite === 'click') {
      this.setState({ invite: 'copy' })
    } else {
      this.setState({ invite: 'click' })
    }
    const input = this.refs.textInput
    input.focus()
    input.select()
  }

  render () {
    const { projectKey } = this.props
    return (
      <div className={styles.header}>
        <div>
          <Link className={styles.title} to="/">Pharaoh</Link>
          <img
            src="images/pharaoh.png"
            style={{
              width    : '50px'
            , position : 'absolute'
            , top      : '3px'
            , left     : '200px'
            }}
          />
          <div className={this.state.invite}>
            <div className={styles.share} onClick={this.toggleCopying}>
              <span className={styles.text}>Invite Participants:</span>
              <img src="images/people.png" style={{ width : '40px' }} />
            </div>
            <input
              ref="textInput"
              className={styles.copyURL}
              type="text"
              readOnly="true"
              value={`http://pharaoh.js.org/#/app/r/${projectKey}`}
            />
          </div>
        </div>
      </div>
    )
  }
}

// &#x1f4cb; or &#128203;
