import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import '../../../style/core.less'
import styles from './Profile.less'

class Profile extends Component {
  render () {
    return (
      <div>
        <div>profile</div>
      </div>
    )
  }
}

export default CSSModules(Profile, styles)
