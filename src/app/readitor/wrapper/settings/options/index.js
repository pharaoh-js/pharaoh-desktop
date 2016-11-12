import React, { PropTypes } from 'react'
import styles from './styles.css'

const Options = ({ themes, updateSettings }) => {
  const handleClick = (theme) => updateSettings('theme', theme)

  const thms = themes.map((theme, i) => (
    <div
      key={i}
      className={styles.option}
      onClick={handleClick(theme)}>
      <div>&mdash; {theme}</div>
    </div>
  ))

  return (
    <div>
      <div className={styles.head}>Themes</div>
      {thms}
    </div>
  )
}

Options.propTypes = {
  themes: PropTypes.array.isRequired
, updateSettings: PropTypes.func.isRequired
}

export default Options
