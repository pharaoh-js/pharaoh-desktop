import React, { Component } from 'react'
import { bool, func, object, shape, string } from 'prop-types'
import File from './File'
import _ from 'lodash'
import styles from './styles'

export default class Folder extends Component {
  static propTypes = {
    createFile: func.isRequired
  , createFolder: func.isRequired
  , deleteItem: func.isRequired
  , firebaseComponentPath: string.isRequired
  , firebaseRef: object.isRequired
  , handleToggle: func.isRequired
  , isOpen: object
  , role: string.isRequired
  , root: bool
  , setMode: func.isRequired
  , showEdit: func.isRequired
  , swapDoc: func.isRequired
  , updateItem: func.isRequired
  , folder: shape({
      folderName: string
    , key: string
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

    var folderTitle = folder.folderName ? (
      <div className={styles.folderSelect}>
        <span onClick={this.handleToggle}>
          <img
            src="/images/folder2x.png"
            style={{
              width        : '16px'
            , position     : 'relative'
            , top          : '3px'
            , paddingRight : '3px'
            }}
          />
          {folder.folderName}
        </span>
        <span>
          <img
            className={role === 'w' ? styles.icons : styles.hidden}
            src="/images/delete.png"
            onClick={this.deleteItem}
          />
          <img
            className={role === 'w' ? styles.icons : styles.hidden}
            src="/images/edit-file.png"
            onClick={this.showEdit(this.updateItem)}
          />
          <img
            className={role === 'w' ? styles.icons : styles.hidden}
            src="/images/plus-icon.png"
            onClick={this.showEdit(this.createFile)}
          />
          <img
            className={role === 'w' ? styles.icons : styles.hidden}
            src="/images/createfolder.png"
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
