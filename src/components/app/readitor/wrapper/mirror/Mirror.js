import React, {PropTypes} from 'react'

const
  BASEREF = 'https://pharaohjs.firebaseio.com/session/'
, Mirror  = React.createClass({
  makeFirePad(subRef, config){
    const
      fpRef      = new Firebase(BASEREF + subRef)
    , codeMirror = CodeMirror(document.getElementById('pad'), config)
    this.firepad = Firepad.fromCodeMirror(fpRef, codeMirror, {defaultText : 'get hacking!'})
  }

, shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pad !== nextProps.pad) {
      return true
    } else if (this.props.config.theme !== nextProps.config.theme) {
      return true
    }
    return false
  }

, componentDidUpdate () {
    let
      parent = this.refs.parent
    , child  = parent.firstChild
    parent.removeChild(child)
    this.makeFirePad(this.props.pad, this.props.config)
  }

, componentDidMount () {
    this.makeFirePad(this.props.pad, this.props.config)
  }

, render () {
    return (
      <div>
        <div ref="parent" id="pad"></div>
      </div>
    )
  }
})

export default Mirror
