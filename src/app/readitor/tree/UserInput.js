import React, { Component } from 'react'
import { func } from 'prop-types'
import styles from './styles.css'

export default class UserInput extends Component {
  static propTypes = {
    editFn: func.isRequired
  , hideEdit: func.isRequired
  }

  inputChange = (e) => {
    this.setState({ userInput: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let userInput = this.state.userInput
    this.props.editFn(userInput)
    this.props.hideEdit()
  }

  render () {
    return (
      <div className={styles.box}>
        <div style={{ margin: '0 0 5px 0' }}>Create / Rename</div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.inputChange}
            placeholder="File or directory name&hellip;"
            type="text"
          />
          <div className={styles.btnContainer}>
            <input
              className={styles.submitImage}
              type="image"
              src="/images/checkmark-lb.png"
            />
            <img onClick={this.props.hideEdit} src="/images/delete.png" />
          </div>
        </form>
      </div>
    )
  }
}
