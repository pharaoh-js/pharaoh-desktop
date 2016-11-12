import React, { PropTypes } from 'react'
import styles from './styles.css'

const TitleBar = (props) => {
  const icon = props.isSetting
    ? ''
    : <img src="images/settings-icon.png" style={{ width: '22px' }} />

  const handleClick = props.isSetting
    ? props.hideSettings
    : props.showSettings

  return (
    <div className={styles.headerBar}>
      <span>{props.pad}</span>
      <div onClick={handleClick} className={styles.settingIcon}>
        {icon}
      </div>
    </div>
  )
}

TitleBar.propTypes = {
  hideSettings: PropTypes.func.isRequired
, isSetting: PropTypes.bool
, pad: PropTypes.string.isRequired
, showSettings: PropTypes.func.isRequired
}

export default TitleBar
