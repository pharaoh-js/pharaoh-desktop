import React              from 'react'
import InlineCss          from 'react-inline-css'
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
  loadfile(input){
    let ed = CodeMirror(document.getElementById('pad'), config)
    let reader = new FileReader()
    reader.onload = function(e){
      ed.setValue(e.target.result)
    }
    reader.readAsText(input.files[0])
  },
  saveText(){
    var textWrite = document.getElementById('pad').value
      , textBlob  = new Blob([textToWrite], {type:'text/plain'})
      , fileNameToSaveAs = 'foo.js'
      , downloadLink = document.createElement('a')
    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = 'save'
    if(window.webkitURL != null){ // chromium lets click clink w/o adding to DOM
      downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob)
    } else { // mozilla does not
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
      downloadLink.onclick = destroyClickedElement
      downloadLink.style.display = 'none'
      document.body.appendChild(downloadLink)
    }
    downloadLink.click()
  },
  destroyClickedElement(event){
    document.body.removeChild(event.target)
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
            <input type="file" onchange="loadfile(this)" style={{position:'absolute',left:'30%'}} />
            <button onclick="saveText()" style={{position:'absolute',left:'50%'}}>save</button>
            <div className={this.state.invite}>
              <div className="share" onClick={this.toggleCopying}>
                <span className="text">Invite participants:</span>
                <img src='images/people.png' style={{width: '40px'}} />
              </div>
              <input
                ref="textInput"
                className="copyURL"
                type="text"
                readOnly="true"
                value={'http://pharaoh.js.org/app/r/' + this.props.projectKey}
              />
            </div>
          </div>
        </div>
      </InlineCss>
    )
  }
})

export default Header

// <button className="btn" data-clipboard-target={'http://pharaoh.js.org/' + this.props.projectKey}>
//   <i className="fa fa-clipboard"></i>
// </button>

