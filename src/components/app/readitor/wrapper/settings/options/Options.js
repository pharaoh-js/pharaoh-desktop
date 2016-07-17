import React     from 'react'
import InlineCss from 'react-inline-css'

const
  stylesheet = require('!css!less!./options.less').toString()
, Options    = React.createClass({
  render () {
    const themes = this.props.themes.map((theme, i) => (
      <div
        className="option"
        onClick={this.props.updateSettings.bind(null, 'theme', theme)}
        key={i}>
        <div>
          &mdash; {theme}
        </div>
      </div>
    ))
    return (
      <InlineCss componentName="Options" stylesheet={stylesheet}>
        <div>
          <div className="head">Themes</div>
          {themes}
        </div>
      </InlineCss>
    )
  }
})

export default Options
