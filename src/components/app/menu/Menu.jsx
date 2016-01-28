import React              from 'react'
import InlineCss          from "react-inline-css"
import { Link, IndexLink} from 'react-router'
const stylesheet = require('!css!less!./header.less').toString()

const Header = React.createClass({
  getInitialState () {
    return {invite:'click'}
  },
  toggleCopying () {
    if (this.state.invite === 'click') {
      this.setState({invite: 'copy'})
    } else {
      this.setState({invite: 'click'})
    }
    let input = this.refs.textInput
    input.focus()
    input.select()
  },
  render () {
    return (
      <InlineCss componentName="Header" stylesheet={stylesheet}>
        <div className="header">
          <div>
            <Link className="title" to={"/"}>Pharaoh</Link>
            <img src="images/pharaoh.png" style={{
              width: '50px',
              position: 'absolute',
              top: '2px',
              left:'12.5%'
              }}
            />
            <div className="buttons">
              <button id="new">new</button>
              <button id="open">open</button>
              <button id="save">save</button>
            </div>
            <div class="info">
              <label>filename:</label><span id="title"></span>
              <label>mode:</label><span id="mode"></span>
            </div>
            <input style={{display: 'none'}} id="openFile" type="file" />
            <input style={{display: 'none'}} id="saveFile" type="file" />
            <div className={this.state.invite}>
              <div className="share" onClick={this.toggleCopying}>
                <span className="text">Invite participants:</span>
                <img src='images/people.png' style={{width: '40px'}}></img>
              </div>
              <input
                ref="textInput"
                className="copyURL"
                type="text"
                readOnly="true"
                value={'http://pharaoh.js.org/' + this.props.projectKey}
              />
            </div>
          </div>
        </div>
      </InlineCss>
    )
  }
})

export default Header

