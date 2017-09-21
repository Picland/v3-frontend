import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class Avatar extends Component {
  static propTypes = {
    shape: PropTypes.string,
    size: PropTypes.string,
    src: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    shape: 'circle',
    size: 'default',
    src: ''
  }

  _handleClick (e) {
    const onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render () {
    let {shape, size, src} = this.props
    return (
      <div>
        <img src={`/img/${src}`} alt="img" onClick={::this._handleClick} className={`cmui-avatar__${shape}__${size}`} />
      </div>
    )
  }
}

export default Avatar
