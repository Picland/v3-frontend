import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Input.less'

class Input extends Component {
  constructor (props) {
    super(props)
  }

  static defaultProps = {
    styleType: 'default',
    type: 'text',
    label: '',
    name: '',
    placeholder: ''
  }

  render () {
    let {styleType, type, label, name, placeholder, children} = this.props
    return (
      <div>
        {label &&
          <label>{label}</label>
        }
        <input styleName={styleType} type={type} name={name} placeholder={placeholder} />
      </div>
    )
  }
}

export default CSSModules(Input, styles)
