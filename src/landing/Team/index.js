import React from 'react'
import Card from './Card'
import styles from './styles.css'
import members from './members'

export default () => (
  <div className={styles.container}>
    <a
      className={styles.teamTitle}
      href="https://github.com/pharaoh-js">
      The Pharaoh Team
    </a>
    <div className={styles.team}>
      {members.map((member, idx) => (
        <Card
          avatar={member.avatar}
          key={idx}
          links={member.links}
          name={member.name}
          summary={member.summary}
        />
      ))}
    </div>
  </div>
)
