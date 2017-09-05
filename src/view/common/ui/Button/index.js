import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../style/core.less'
import './index.less'

class Button extends Component {
  static propTypes = {
    styleType: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    styleType: 'default'
  }

  _handleClick (e) {
    const onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render () {
    let {styleType, children} = this.props
    return (
      <button className={`cmui-button__${styleType}`} onClick={::this._handleClick}>{children}</button>
    )
  }
}

export default Button
