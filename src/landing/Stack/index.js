import React from 'react'
import styles from './styles.css'

const Stack = () => (
  <div className={styles.atomContainer}>
    <div>Built With</div>
    <img src="images/lessicon.jpeg" style={{ width: '105px' }} />
    <img src="images/firebase.png" className="atomIcon" />
    <img src="images/unnamed.png" className={styles.w25} />
    <img src="images/react-opti.png" className={styles.w25} />
    <img src="images/atom.png" className="atom-icon" />
    <img src="images/codemirror.png" className={styles.w25} style={{ marginBottom: '13px' }} />
  </div>
)

export default Stack
