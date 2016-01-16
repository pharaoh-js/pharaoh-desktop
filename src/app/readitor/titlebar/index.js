import React from 'react'
import { bool, func, string } from 'prop-types'
import styles from './styles.css'

const TitleBar = (props) => {
  const handleClick = props.updateSettings('isDark', !props.isDark)
  return (
    <div className={styles.headerBar}>
      <span>{props.pad}</span>
      <div onClick={handleClick} className={styles.settingIcon}>
        <img
          src="/images/light-dark.png"
          alt="Toggle light and dark mode."
          style={{ width: '22px' }}
        />
      </div>
    </div>
  )
}

TitleBar.propTypes = {
  isDark: bool
, pad: string.isRequired
, updateSettings: func
}

export default TitleBar
