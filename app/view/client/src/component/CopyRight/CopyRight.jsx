import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import '../../style/core.less'
import styles from './CopyRight.less'

class CopyRight extends Component {
  render () {
    return (
      <div styleName='copyright'>© 2015-2017 苏ICP备15056713号</div>
    )
  }
}

export default CSSModules(CopyRight, styles)
