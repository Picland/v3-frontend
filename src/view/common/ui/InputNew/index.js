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
    content: PropTypes.string,
    onChange: PropTypes.func,
    hasbutton: PropTypes.bool
  }

  static defaultProps = {
    label: '',
    content: '',
    placeholder: ''
  }

  constructor (props) {
    super(props)
    let state = {
      showEdit: true,
      inputProps: {
        readOnly: 'readOnly'
      },
      content: this.props.content,
      name: this.props.name
    }
    if (!props.hasbutton) state.inputProps.readOnly = ''
    this.state = state
  }

  _handleChange (e) {
    this.setState({
      content: e.target.value
    })
    this.props.onChange(e.target.value)
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
        <input value={this.state.content}
               onChange={(e) => this._handleChange(e)}
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
