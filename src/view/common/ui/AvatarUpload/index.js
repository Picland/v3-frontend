import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class AvatarUpload extends Component {
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
        {src
          ? <div className="cmui-avatarupload">
            <img src={`/img/${src}`} alt="img" onClick={::this._handleClick} className={`cmui-avatarupload__${shape}__${size}`} />
            <div className="cmui-avatarupload__cover" onClick={::this._handleClick}>更换头像</div>
          </div>
          : <div onClick={::this._handleClick} className={`cmui-avatarupload__${shape}__${size}`}>设置头像</div>
        }
      </div>
    )
  }
}

export default AvatarUpload
