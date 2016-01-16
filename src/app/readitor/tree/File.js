import React, { Component } from 'react'
import { func, object, shape, string } from 'prop-types'
import styles from './styles.css'

export default class File extends Component {
  static propTypes = {
    deleteItem: func.isRequired
  , file: shape({ fileName: string.isRequired }).isRequired
  , firebaseComponentPath: string.isRequired
  , firebaseRef: object.isRequired
  , role: string.isRequired
  , setMode: func.isRequired
  , showEdit: func.isRequired
  , swapDoc: func.isRequired
  , updateItem: func.isRequired
  }

  deleteItem = () => {
    this.props.deleteItem(this.props.firebaseRef, this.props.firebaseComponentPath)
  }

  updateItem = (userInput) => {
    this.props.updateItem(this.props.firebaseRef, this.props.firebaseComponentPath, userInput)
  }

  sendLink = () => {
    this.props.swapDoc(this.props.firebaseComponentPath, this.props.file.fileName)
    this.props.setMode(this.props.file.fileName)
  }

  showEdit = (editFn) => () => {
    this.props.showEdit(editFn)
  }

  render () {
    const { file, role } = this.props

    return (
      <div className={styles.file}>
        <li className={styles.fileLength}>
          <small>
            <img
              src="/images/file.png"
              style={{
                width    : '20px'
              , position : 'relative'
              , top      : '3px'
              }}
            />
            <span onClick={this.sendLink}>{file.fileName}</span>
            <img
              src="/images/delete.png"
              className={role === 'w' ? styles.icons : styles.hidden}
              onClick={this.deleteItem}
            />
            <img
              src="/images/edit-file.png"
              className={role === 'w' ? styles.icons : styles.hidden}
              onClick={this.showEdit(this.updateItem)}
            />
          </small>
        </li>
      </div>
    )
  }
}
