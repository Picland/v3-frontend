import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import autobind from 'autobind-decorator'
import '../../style/core.less'
import styles from './index.less'

// @autobind
@CSSModules(styles)
class InputForm extends Component {
  static propTypes = {
    label: PropTypes.string,
    content: PropTypes.string
  }

  static defaultProps = {
    label: '',
    content: 'default'
  }

  constructor (props) {
    super(props)
    this.state = {
      showEdit: true
    }
  }

  _edit () {
    console.log('edit')
    this.setState({
      showEdit: false
    })
  }

  _save () {
    console.log('save')
    this.setState({
      showEdit: true
    })
  }

  _cancel () {
    console.log('cancel')
    this.setState({
      showEdit: true
    })
  }

  render () {
    let {label, content, ...others} = this.props
    const buttonEdit = classNames({
      'button': !this.state.showEdit,
      'button-active': this.state.showEdit
    })
    const buttonSave = classNames({
      'button': this.state.showEdit,
      'button-active': !this.state.showEdit
    })
    const buttonCancel = classNames({
      'button-cancel': this.state.showEdit,
      'button-cancel-active': !this.state.showEdit
    })
    return (
      <div styleName="input-form" {...others}>
        <span styleName="label">{label}</span>
        <span styleName="content">{content}</span>
        <span styleName={buttonEdit} onClick={() => this._edit()}>修改</span>
        <span>
          <span styleName={buttonCancel} onClick={() => this._cancel()}>取消</span>
          <span styleName={buttonSave} onClick={() => this._save()}>保存</span>
        </span>
      </div>
    )
  }
}

export default InputForm
