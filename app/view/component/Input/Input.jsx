import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import '../../style/core.less'
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
        {type === 'password' &&
          <input styleName={styleType} type={type} name={name} placeholder={placeholder} autoComplete='new-password' />
        }
        {type !== 'password' &&
          <input styleName={styleType} type={type} name={name} placeholder={placeholder} />
        }
      </div>
    )
  }
}

export default CSSModules(Input, styles)
