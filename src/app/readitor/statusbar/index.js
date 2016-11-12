import React, { PropTypes } from 'react'
import styles from './styles.css'

const StatusBar = ({ currentMode }) => (
  <div className={styles.footerBar}>
    <div style={{ position: 'absolute', right: '0px' }}>
      <span>{currentMode}</span>
    </div>
  </div>
)

StatusBar.propTypes = {
  currentMode: PropTypes.string.isRequired
}

export default StatusBar
