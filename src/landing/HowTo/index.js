import React from 'react'
import styles from './styles.css'

const HowTo = () => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h2>About Pharaoh</h2>
    </div>
    <br />
    <span className={styles.big}>About:</span>
    <p>
      We're a group of students at <a className={styles.devmtndevmtn} href="https://devmountain.com">DevMountain</a>,
      building just about the neatest instructor tool you've ever seen. Imagine
      a lecture with no JSBin or JSFiddle, with no opening the Developer Tools
      in your browser just to show something in the console, with no rushed
      projects thrown together and then sent out on Slack. Imagine a read-only
      app that would allow students to see your code in realtime, as you make
      changes, and see everything you `import` or `require`, and check out the
      files you're pulling from.
    </p>
    <p>
      Well, that's what we imagined, because right now there's a ton of tooling
      around Javascript development, but not nearly enough tools for teaching
      it. We're starting with a React-based student app and a package for one of
      the most popular editors on the market. We hope to build this into
      something pretty awesome, because no one should have to use JSBin, Github,
      and Slack, just to get through one lecture.
    </p>
    <span className={styles.big}>Usage:</span>
    <p>
      Instructors: entire the desired session name (optional), hit 'Start!,' and
      share your link.  Also consider downloading the desktop app. Enjoy!
    </p>
    <p>
      Students: you will receive a string from your instructor. Enter this
      session code and hit 'GO!' to join the session!
    </p>
  </div>
)

export default HowTo
