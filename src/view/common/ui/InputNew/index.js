import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import '../../style/core.less'
import './index.less'

class InputNew extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    hasbutton: PropTypes.bool
  }

  static defaultProps = {
    label: '',
    value: '',
    placeholder: ''
  }

  constructor (props) {
    super(props)
    let state = {
      inputProps: {
        readOnly: 'readOnly'
      },
      active: false,
      value: this.props.value
    }
    if (!props.hasbutton) state.inputProps.readOnly = ''
    this.state = state
  }

  _handleChange (e) {
    this.setState({
      value: e.target.value
    })
    this.props.onChange(e.target.value, this.props.name)
  }
  _handleFocus () {
    this.setState({
      active: true
    })
  }
  _handleBlur () {
    this.setState({
      active: false
    })
  }
  render () {
    let { name, placeholder, type } = this.props
    const inputForm = classNames({
      'cmui-inputnew': !this.state.active,
      'cmui-inputnew__active': this.state.active
    })
    return (
      <div className={inputForm}>
        <input value={this.state.value}
               onChange={::this._handleChange}
               onFocus={::this._handleFocus}
               onBlur={::this._handleBlur}
               // ref={ref => (this.contentInput = ref)}
               {...this.state.inputProps}
               name={name}
               placeholder={placeholder}
               type={type}
               autoComplete="off"
        />
      </div>
    )
  }
}

export default InputNew
