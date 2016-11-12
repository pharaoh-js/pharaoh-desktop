import React, { Component, PropTypes } from 'react'
import Folder from './Folder'
import UserInput from './UserInput'
import styles from './styles'

const { Firebase } = global
export default class FileTree extends Component {
  static propTypes = {
    editFn: PropTypes.func
  , hideEdit: PropTypes.func
  , isEditing: PropTypes.bool
  , pad: PropTypes.string
  , projectKey: PropTypes.string.isRequired
  , role: PropTypes.string
  , setMode: PropTypes.func.isRequired
  , showEdit: PropTypes.func.isRequired
  , swapDoc: PropTypes.func.isRequired
  }

  state = {
    projectName      : ''
  , projectDirectory : {}
  , isOpen           : {}
  , userInput        : ''
  }

  readProjectDirectory = (refBase, folderRef) => {
    let newRef = new Firebase(`${refBase}/${folderRef}`)
    newRef.on('child_added', (item) => {
      if (this.state.projectDirectory[item.key()] || typeof item.val() !== 'object') return
      let itemVal  = item.val()
      let toChange = Object.assign({}, this.state.projectDirectory)
      toChange[itemVal.key] = itemVal
      this.setState({ projectDirectory: toChange })
    })
  }

  removeProjectItem = (refBase, folderRef) => {
    let newRef = new Firebase(`${refBase}/${folderRef}`)
    newRef.on('child_removed', (item) => {
      let itemVal  = item.val()
      let toChange = Object.assign({}, this.state.projectDirectory)
      delete toChange[itemVal.key]
      this.setState({ projectDirectory: toChange })
    })
  }

  updateProjectItem = (refBase, folderRef) => {
    let newRef = new Firebase(`${refBase}/${folderRef}`)
    newRef.on('child_changed', (item) => {
      let itemVal  = item.val()
      let toChange = Object.assign({}, this.state.projectDirectory)
      toChange[itemVal.key] = itemVal
      this.setState({ projectDirectory: toChange })
    })
  }

  firebaseRef   = new Firebase('https://pharaohjs.firebaseio.com/session')
  refFromRouter = this.props.projectKey || 'projectKey'

  componentDidMount () {
    this.projectRef = new Firebase(`${this.firebaseRef}/${this.refFromRouter}`)
    this.projectRef.once('value', (project) => {
      let projectSession = project.val()
      this.setState({ projectName: projectSession.projectName })
    })

    this.readProjectDirectory(this.firebaseRef, this.refFromRouter)
    this.removeProjectItem(this.firebaseRef, this.refFromRouter)
    this.updateProjectItem(this.firebaseRef, this.refFromRouter)
  }

  createFolder = (firebaseRef, componentRef, userInput) => {
    if (this.props.role === 'r') return
    let
      ref           = new Firebase(`${firebaseRef}/${componentRef}`)
    , parent        = ref.key()
    , newFolderName = userInput
    , newFolder     = ref.push()
    , folderKey     = newFolder.key()

    newFolder.set({
      folderName : newFolderName
    , key        : folderKey
    })

    if (parent !== this.refFromRouter) {
      let folderState = Object.assign({}, this.state.isOpen)
      folderState[parent] = true
      this.setState({ isOpen: folderState })
    }
  }

  createFile = (firebaseRef, componentRef, userInput) => {
    if (this.props.role === 'r') return
    let
      ref         = new Firebase(`${firebaseRef}/${componentRef}`)
    , parent      = ref.key()
    , newFileName = userInput
    , newFile     = ref.push()
    , fileKey     = newFile.key()

    newFile.set({
      fileName : newFileName
    , key      : fileKey
    })

    this.props.swapDoc(`${componentRef}/${fileKey}`, newFileName)
    if (parent !== this.refFromRouter) {
      let folderState = Object.assign({}, this.state.isOpen)
      folderState[parent] = true
      this.setState({ isOpen: folderState })
    }
  }

  deleteItem = (firebaseRef, componentRef) => {
    if (this.props.role === 'r') return
    let ref = new Firebase(`${firebaseRef}/${componentRef}`)
    ref.set(null)
  }

  updateItem = (firebaseRef, componentRef, userInput) => {
    if (this.props.role === 'r') return
    let ref = new Firebase(`${firebaseRef}/${componentRef}`)
    ref.once('value', (item) => {
      let toChange = item.val()
      if (toChange.folderName) {
        ref.update({ folderName: userInput })
      }
      if (toChange.fileName) {
        ref.update({ fileName: userInput })
      }
    })
  }

  handleToggle = (key) => {
    let oldVal   = this.state.isOpen[key]
    let newState = Object.assign({}, this.state.isOpen)

    newState[key] = !oldVal
    this.setState({ isOpen : newState })
  }

  createRootFile = (userInput) => {
    this.createFile(this.firebaseRef, this.refFromRouter, userInput)
  }

  createRootFolder = (userInput) => {
    this.createFolder(this.firebaseRef, this.refFromRouter, userInput)
  }

  showEdit = (editFn) => () => {
    this.props.showEdit(editFn)
  }

  render () {
    return (
      <div className={styles.fileBrowser}>
        <span
          className={this.props.role === 'w' ? styles.createFolder : styles.hideTree}
          onClick={this.showEdit(this.createRootFolder)}>
          <img
            src="images/createfolder.png"
            style={{
              width    : '20px'
            , position : 'relative'
            , top      : '5px'
            , padding  : '0 5px'
            }}
          />
            new directory
        </span>
        <span
          className={this.props.role === 'w' ? styles.createFolder : styles.hideTree}
          onClick={this.showEdit(this.createRootFile)}>
          <img
            src="images/plus-icon.png"
            style={{
              width    : '20px'
            , position : 'relative'
            , top      : '5px'
            , padding  : '0 5px'
            }}
          />
            new file
        </span>
        <Folder
          createFile={this.createFile}
          createFolder={this.createFolder}
          deleteItem={this.deleteItem}
          firebaseComponentPath={this.refFromRouter}
          firebaseRef={this.firebaseRef}
          folder={this.state.projectDirectory}
          handleToggle={this.handleToggle}
          isOpen={this.state.isOpen}
          role={this.props.role}
          root
          setMode={this.props.setMode}
          showEdit={this.props.showEdit}
          swapDoc={this.props.swapDoc}
          updateItem={this.updateItem}
        />
        {this.props.isEditing &&
          <UserInput
            catchInput={this.catchInput}
            editFn={this.props.editFn}
            hideEdit={this.props.hideEdit}
          />
        }
      </div>
    )
  }
}
