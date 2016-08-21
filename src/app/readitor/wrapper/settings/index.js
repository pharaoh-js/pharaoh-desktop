import React, { PropTypes } from 'react'
import Options from './options'
import styles from './styles.css'

const Settings = (props) => {
  const handleClick = props.isSetting
  ? props.hideSettings
  : props.showSettings

  return (
    <div className={styles.settings}>
      <div className={styles.settingsTab}>
        <span>
          <small onClick={handleClick}>
            <img
              onClick={this.props.hideSettings}
              src="images/closeicon.svg"
              style={{ width: '10px', marginRight: '10px' }}
            />
          </small>
          Settings
        </span>
      </div>
      <Options
        themes={props.themes}
        updateSettings={props.updateSettings}
      />
    </div>
  )
}

Settings.propTypes = {
  isSetting: PropTypes.bool
, hideSettings: PropTypes.func.isRequired
, showSettings: PropTypes.func.isRequired
, themes: PropTypes.array.isRequired
, updateSettings: PropTypes.func.isRequired
}

export default Settings
