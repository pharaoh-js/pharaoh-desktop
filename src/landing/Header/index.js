import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './styles.css'

export default class Header extends Component {
  state = { project: '' }

  handleProjectEntry = (e) => {
    this.setState({ project : e.target.value })
  }

  render () {
    return (
      <div className={styles.header}>
        <span className={styles.big}>Pharaoh</span>
        <img
          src="images/pharaoh.png"
          style={{
            width    : '50px'
          , position : 'relative'
          , top      : '6px'
          }}
        />
        <div className={styles.headerRight}>
          <span>Join Existing Session:
            <input
              type="text"
              value={this.state.project}
              onChange={this.handleProjectEntry}
            />
          </span>
          <Link
            className={styles.link}
            to={`/app/r/${this.state.project}`}>
            Go!
          </Link>
        </div>
      </div>
    )
  }
}
