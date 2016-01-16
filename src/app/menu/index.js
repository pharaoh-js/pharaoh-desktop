import React, { Component } from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './styles.css'

export default class Header extends Component {
  static propTypes = {
    projectKey: string.isRequired
  }

  copy = () => {
    const input = this.refs.link
    const text = input.value
    if (window.clipboardData) { // IE
      window.clipboardData.setData('text', text)
    } else {
      try {
        window.getSelection().removeAllRanges()
        input.focus()
        input.select()
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } catch (e) {
        console.warn('This browser does not support copy.', e)
      }
    }
  }

  render () {
    return (
      <div className={styles.header}>
        <div>
          <Link to="/"><img src="/images/pharaoh.png" className={styles.logo} /></Link>
          <div className={styles.shareSection}>
            <button className={styles.btn} onClick={this.copy}>Copy</button>
            <input
              className={styles.copyURL}
              onClick={this.copy}
              readOnly="true"
              ref="link"
              type="text"
              value={this.props.projectKey}
            />
          </div>
        </div>
      </div>
    )
  }
}
