import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
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
  name: string.isRequired
, summary: string.isRequired
, avatar: string.isRequired
, links: arrayOf(shape({
    url: string.isRequired
  , title: string.isRequired
  })).isRequired
}

export default Card
