import React from 'react'
import InlineCss from "react-inline-css"
import {ReactRouter, Link } from 'react-router'

const Header = React.createClass({
    render (){
        return(
            <InlineCss stylesheet={`

            `}>
              <big>Pharaoh JS</big>
              <img src="src/shared/images/pharaoh.png"
                style={{
              width:'50px',
              position:'relative',
              top:'8px'
                }}></img>
              <div className="header-right">
                  <span>Enter your URL here: <input type="text"></input>
                </span>
                <Link className="link" to={'/app'}>GO</Link>
              </div>
            </InlineCss>
        )
    }
})

export default Header
