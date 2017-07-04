import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import '../../style/core.less'
import styles from './Input.less'

@CSSModules(styles)
class Input extends Component {
  static propTypes = {
    styleType: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    styleType: 'default',
    type: 'text',
    label: ''
  }

  render () {
    let {styleType, label, type, ...others} = this.props
    return (
      <div>
        {label &&
          <label>{label}</label>
        }
        {type === 'password' &&
          <input styleName={styleType} autoComplete="new-password" {...others} />
        }
        {type !== 'password' &&
          <input styleName={styleType} type={type} name={name} {...others} />
        }
      </div>
    )
  }
}

export default Input
