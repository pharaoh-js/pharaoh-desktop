import React, { Component, PropTypes } from 'react'
import Wrapper from './wrapper'
import StatusBar from './statusbar'
import TitleBar from './titlebar'
import Tree from './tree'
import styles from './styles.css'

const modeObj = {
  css      : 'css'
, less     : 'css'
, clj      : 'clojure'
, cljs     : 'clojure'
, coffee   : 'coffeescript'
, elm      : 'elm'
, jade     : 'jade'
, js       : 'javascript'
, json     : 'javascript'
, jsx      : 'jsx'
, md       : 'gfm'
, mkd      : 'gfm'
, markdown : 'gfm'
, mkdown   : 'gfm'
, go       : 'go'
, hs       : 'haskell'
, html     : 'htmlmixed'
, htm      : 'htmlmixed'
, xhtml    : 'htmlmixed'
, lua      : 'lua'
, pl       : 'perl'
, php      : 'php'
, php3     : 'php'
, php4     : 'php'
, php5     : 'php'
, phps     : 'php'
, phtml    : 'php'
, py       : 'python'
, pyw      : 'python'
, rb       : 'ruby'
, rake     : 'ruby'
, sass     : 'sass'
, scss     : 'sass'
, scm      : 'scheme'
, ss       : 'scheme'
, zsh      : 'shell'
, sh       : 'shell'
, bash     : 'shell'
, ksh      : 'shell'
, styl     : 'stylus'
, swift    : 'swift'
, sql      : 'sql'
, sqlite   : 'sql'
, lsp      : 'lisp'
, lisp     : 'lisp'
, cl       : 'lisp'
, el       : 'lisp'
, vue      : 'vue'
, yml      : 'yaml'
, yaml     : 'yaml'
, xml      : 'xml'
, txt      : null
, log      : null
, text     : null
, def      : null
, list     : null
, conf     : null
}

export default class Viewer extends Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired
  , role: PropTypes.string.isRequired
  }

  state = {
    isSetting  : false
  , isEditing  : false
  , mode       : ''
  , activeFile : ''
  , themes: [
      'abcdef'
    , 'base16-dark'
    , 'base16-light'
    , 'default'
    , 'mbo'
    , 'monokai'
    , 'tomorrow-night-eighties'
    , 'zenburn'
    , 'zeemirror'
    ]
  }

  componentDidMount () {
    const student = !!(this.props.role === 'r')
    const cmConfig = {
      autoCloseBrackets  : true
    , autoCloseTags      : true
    , autofocus          : true
    , cursorScrollMargin : 2
    , lineNumbers        : true
    , lineWrapping       : true
    , matchBrackets      : true
    , mode               : 'javascript'
    , tabSize            : 2
    , theme              : 'zeemirror'
    , undoDepth          : 1000
    , readOnly           : student
//    , extraKeys: {
//        'Cmd-S'  : function(instance){handleSave()}
//      , 'Ctrl-S' : function(instance){handleSave()}
//      , 'Cmd-O'  : function(instance){handleOpen()}
//      , 'Ctrl-O' : function(instance){handleOpen()}
// these will need to be hooked up with fire(pad|base) at some point.
//      , 'Cmd-N'  : function(instance){handleNew()}
//      , 'Ctrl-N' : function(instance){handleNew()}
//      }
    }
    this.setState({
      pad        : `${this.props.projectKey}/default`
    , cmConfig   : cmConfig
    })
  }

  swapDoc = (path, name) => {
    this.setState({
      pad        : path
    , activeFile : name
    , mode       : this.modeFromFilename(name)
    })
  }

  modeFromFilename = (fileName) => {
    const arr = fileName.split('.')
    const ext = arr[arr.length - 1]
    return modeObj[ext]
  }

  setMode = (fileName) => {
    const mode = this.modeFromFilename(fileName)
    this.updateSettings('mode', mode)
  }

  showSettings = () => {
    this.setState({ isSetting: true })
  }

  hideSettings = () => {
    this.setState({ isSetting: false })
  }

  showEdit = (editFn) => {
    this.setState({ isEditing: true })
    this.setState({ editFn })
  }

  hideEdit = () => {
    this.setState({ isEditing: false })
  }

  updateSettings = (prop, val) => {
    const config = Object.assign({}, this.state.cmConfig)
    config[prop] = val
    this.setState({ cmConfig: config })
  }

  render () {
    return (
      <div className={styles.container}>
        <TitleBar
          isSetting={this.state.isSetting}
          pad={this.state.activeFile}
          showSettings={this.showSettings}
          hideSettings={this.hideSettings}
        />
        <Tree
          editFn={this.state.editFn}
          hideEdit={this.hideEdit}
          isEditing={this.state.isEditing}
          pad={this.state.pad}
          projectKey={this.props.projectKey}
          role={this.props.role}
          setMode={this.setMode}
          showEdit={this.showEdit}
          swapDoc={this.swapDoc}
        />
        <Wrapper
          config={this.state.cmConfig}
          showSettings={this.showSettings}
          hideSettings={this.hideSettings}
          isSetting={this.state.isSetting}
          pad={this.state.pad}
          themes={this.state.themes}
          updateSettings={this.updateSettings}
        />
        <StatusBar currentMode={this.state.mode} />
      </div>
    )
  }
}
