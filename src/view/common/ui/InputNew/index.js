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
      showEdit: true,
      inputProps: {
        readOnly: 'readOnly'
      },
      value: this.props.value
    }
    if (!props.hasbutton) state.inputProps.readOnly = ''
    this.state = state
  }

  _handleChange (e) {
    this.setState({
      value: e.target.value
    })
    this.props.onChange(this.props.name, e.target.value)
  }

  render () {
    let { label, name, hasbutton, placeholder, type } = this.props
    const inputForm = classNames({
      'cmui-inputnew': this.state.showEdit && hasbutton,
      'cmui-inputnew__active': !this.state.showEdit && hasbutton,
      'cmui-inputnew__nobutton': !hasbutton
    })
    return (
      <div className={inputForm}>
        <div className="label">{label}</div>
        <input value={this.state.value}
               onChange={::this._handleChange}
               ref={ref => (this.contentInput = ref)}
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
