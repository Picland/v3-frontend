import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.less'

class Button extends Component {
  constructor (props) {
    super(props)
  }

  static defaultProps = {
    type: 'default',
    htmlType: 'submit',
    value: ''
  }

  render () {
    let {type, htmlType, value, children} = this.props
    return (
      <button styleName={type} type={htmlType} value={value}>{children}</button>
    )
  }
}

export default CSSModules(Button, styles)
