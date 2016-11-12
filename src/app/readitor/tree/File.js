import React, { Component, PropTypes } from 'react'
import styles from './styles.css'

export default class File extends Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired
  , file: PropTypes.shape({ fileName: PropTypes.string.isRequired }).isRequired
  , firebaseComponentPath: PropTypes.string.isRequired
  , firebaseRef: PropTypes.object.isRequired
  , role: PropTypes.string.isRequired
  , setMode: PropTypes.func.isRequired
  , showEdit: PropTypes.func.isRequired
  , swapDoc: PropTypes.func.isRequired
  , updateItem: PropTypes.func.isRequired
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
    return (
      <div className={styles.file}>
        <li className={styles.fileLength}>
          <small>
            <img
              src="images/file.png"
              style={{
                width    : '20px'
              , position :'relative'
              , top      : '3px'
              }}
            />
            <span onClick={this.sendLink}>{this.props.file.fileName}</span>
            <img
              src="images/delete.png"
              className={`${this.props.role === 'w' && 'teacher'} icons`}
              onClick={this.deleteItem}
            />
            <img
              src="images/edit-file.png"
              className={`${this.props.role === 'w' && 'teacher'} icons`}
              onClick={this.showEdit(this.updateItem)}
            />
          </small>
        </li>
      </div>
    )
  }
}
