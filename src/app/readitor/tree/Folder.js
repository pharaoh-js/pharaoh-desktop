import React, { Component, PropTypes } from 'react'
import File from './File'
import _ from 'lodash'
import styles from './styles'

export default class Folder extends Component {
  static propTypes = {
    createFile: PropTypes.func.isRequired
  , createFolder: PropTypes.func.isRequired
  , deleteItem: PropTypes.func.isRequired
  , firebaseComponentPath: PropTypes.string.isRequired
  , firebaseRef: PropTypes.object.isRequired
  , handleToggle: PropTypes.func.isRequired
  , isOpen: PropTypes.object
  , role: PropTypes.string.isRequired
  , root: PropTypes.bool
  , setMode: PropTypes.func.isRequired
  , showEdit: PropTypes.func.isRequired
  , swapDoc: PropTypes.func.isRequired
  , updateItem: PropTypes.func.isRequired
  , folder: PropTypes.shape({
      folderName: PropTypes.string
    , key: PropTypes.string
    })
  }

  deleteItem = () => {
    this.props.deleteItem(this.props.firebaseRef, this.props.firebaseComponentPath)
  }

  createFile = (userInput) => {
    this.props.createFile(this.props.firebaseRef, this.props.firebaseComponentPath, userInput)
  }

  createFolder = (userInput) => {
    this.props.createFolder(this.props.firebaseRef, this.props.firebaseComponentPath, userInput)
  }

  updateItem = (userInput) => {
    this.props.updateItem(this.props.firebaseRef, this.props.firebaseComponentPath, userInput)
  }

  handleToggle = () => {
    this.props.handleToggle(this.props.folder.key)
  }

  showEdit = (editFn) => () => {
    this.props.showEdit(editFn)
  }

  render () {
    const {
      createFile
    , createFolder
    , deleteItem
    , firebaseComponentPath
    , firebaseRef
    , folder
    , handleToggle
    , isOpen
    , role
    , root
    , setMode
    , showEdit
    , swapDoc
    , updateItem
    } = this.props

    var folderTitle = this.props.folder.folderName ? (
      <div className={styles.folderSelect}>
        <span onClick={this.handleToggle}>
          <img
            src="images/folder2x.png"
            style={{
              width        : '16px'
            , position     : 'relative'
            , top          : '3px'
            , paddingRight : '3px'
            }}
          />
          {this.props.folder.folderName}
        </span>
        <span>
          <img
            className={this.props.role === 'w' ? 'icons teacher' : 'icons'}
            src="images/delete.png"
            onClick={this.deleteItem}
          />
          <img
            className={this.props.role === 'w' ? 'icons teacher' : 'icons'}
            src="images/edit-file.png"
            onClick={this.showEdit(this.updateItem)}
          />
          <img
            className={this.props.role === 'w' ? 'icons teacher' : 'icons'}
            src="images/plus-icon.png"
            onClick={this.showEdit(this.createFile)}
          />
          <img
            className={this.props.role === 'w' ? 'icons teacher' : 'icons'}
            src="images/createfolder.png"
            onClick={this.showEdit(this.createFolder)}
          />
        </span>
      </div>
    ) : null

    const readDirectory = function (folderObj) {
      const folders = _.values(folderObj).map((folderItem, index) => {
        if (folderItem.folderName) {
          return (
            <Folder
              createFile={createFile}
              createFolder={createFolder}
              deleteItem={deleteItem}
              firebaseComponentPath={`${firebaseComponentPath}/${folderItem.key}`}
              firebaseRef={firebaseRef}
              folder={folderItem}
              handleToggle={handleToggle}
              isOpen={isOpen}
              key={index}
              role={role}
              setMode={setMode}
              showEdit={showEdit}
              swapDoc={swapDoc}
              updateItem={updateItem}
            />
          )
        }
      })

      const files = _.values(folderObj).map((folderItem, index) => {
        if (folderItem.fileName) {
          return (
            <File
              deleteItem={deleteItem}
              file={folderItem}
              firebaseComponentPath={`${firebaseComponentPath}/${folderItem.key}`}
              firebaseRef={firebaseRef}
              key={index}
              role={role}
              setMode={setMode}
              showEdit={showEdit}
              swapDoc={swapDoc}
              updateItem={updateItem}
            />
          )
        }
      })

      return folders.concat(files)
    }

    const folderContents = root
      ? readDirectory(folder)
      : isOpen[folder.key]
        ? readDirectory(folder)
        : null

    return (
      <div>
        <div className={styles.folder}>
          {folderTitle}
        </div>
        <ul className={styles.customList}>
          {folderContents}
        </ul>
      </div>
    )
  }
}
