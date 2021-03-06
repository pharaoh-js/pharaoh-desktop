import React, { Component } from 'react'
import { object, string } from 'prop-types'

const { CodeMirror, Firebase, Firepad } = global
const BASEREF = 'https://pharaohjs.firebaseio.com/session/'

export default class Mirror extends Component {
  static propTypes = {
    config: object.isRequired
  , theme: string.isRequired
  , pad: string
  }

  makeFirePad = (subRef, config) => {
    const fpRef      = new Firebase(BASEREF + subRef)
    const codeMirror = CodeMirror(document.getElementById('pad'), config)
    this.firepad = Firepad.fromCodeMirror(fpRef, codeMirror)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.pad !== nextProps.pad) {
      return true
    } else if (this.props.theme !== nextProps.theme) {
      return true
    }
    return false
  }

  componentDidUpdate () {
    let parent = this.refs.parent
    let child  = parent.firstChild
    parent.removeChild(child)
    this.makeFirePad(this.props.pad, this.props.config)
  }

  componentDidMount () {
    this.makeFirePad(this.props.pad, this.props.config)
  }

  render () {
    return <div ref="parent" id="pad" />
  }
}
