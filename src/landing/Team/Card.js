import React, { PropTypes } from 'react'
import styles from './styles.css'

const Card = ({ name, summary, avatar, links }) => {
  const Links = () => (
    <span>
      {links.map((link, idx) => (
        <span key={idx}>
          {' '}
          <a
            className={styles.links}
            title={`${name}'s ${link.title}`}
            href={link.url}>
            {link.title}
          </a>
          {' '}
        </span>
      ))}
    </span>
  )

  return (
    <div className={styles.card}>
      <div>
        <img src={avatar} className={styles.cardPic} />
      </div>
      <span className={styles.big}>{name}</span>
      <p>{summary}</p>
      <Links />
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired
, summary: PropTypes.string.isRequired
, avatar: PropTypes.string.isRequired
, links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired
  , title: PropTypes.string.isRequired
  })).isRequired
}

export default Card
