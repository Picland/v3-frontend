import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import styles from './Avatar.less'
import '../../style/core.less'

@CSSModules(styles)
class Avatar extends Component {
  static propTypes = {
    shape: PropTypes.string,
    size: PropTypes.string,
    src: PropTypes.string
  }

  static defaultProps = {
    shape: 'circle',
    size: 'default',
    src: ''
  }

  render () {
    let {shape, size, src, ...others} = this.props
    return (
      <div>
        <img src={`/img/${src}`} alt="img" styleName={shape} {...others} />
      </div>
    )
  }
}

export default Avatar
