import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import '../../style/core.less'
import styles from './index.less'

@CSSModules(styles)
class Input extends Component {
  static propTypes = {
    styleType: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    validationState: PropTypes.bool,
    help: PropTypes.string
  }

  static defaultProps = {
    styleType: 'default',
    type: 'text',
    label: ''
  }

  render () {
    let {styleType, label, type, validationState, help, ...others} = this.props
    return (
      <div>
        {label &&
          <label>{label}</label>
        }
        <input styleName={styleType} type={type} name={name} {...others} />
        {!validationState && <div styleName="help">{help}</div>}
      </div>
    )
  }
}

export default Input
