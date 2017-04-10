import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.less'

class Button extends Component {
  constructor (props) {
    super(props)
  }

  static defaultProps = {
    styleType: 'default',
    type: 'submit',
    value: ''
  }

  render () {
    let {styleType, type, value, children} = this.props
    return (
      <button styleName={styleType} type={type} value={value}>{children}</button>
    )
  }
}

export default CSSModules(Button, styles)
