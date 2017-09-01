import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import '../../style/core.less'
import styles from './index.less'

@CSSModules(styles)
class Button extends Component {
  static propTypes = {
    styleType: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    styleType: 'default'
  }

  handleClick = (e) => {
    const onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render () {
    let {styleType, children, onClick, ...others} = this.props
    return (
      <button styleName={styleType} onClick={this.handleClick} {...others}>{children}</button>
    )
  }
}

export default Button
