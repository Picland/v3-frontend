import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
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
    // debugger
  }

  _renderEdit () {
    return (
      <span styleName="button" onClick={() => this._edit()}>修改</span>
    )
  }

  _renderSave () {
    return (
      <span>
        <span styleName="button-cancel" onClick={() => this._cancel()}>取消</span>
        <span styleName="button" onClick={() => this._save()}>保存</span>
      </span>
    )
  }

  render () {
    let {label, content, ...others} = this.props
    let loginHtml
    if (this.state.showEdit) {
      loginHtml = this._renderEdit()
    } else {
      loginHtml = this._renderSave()
    }
    return (
      <div styleName="input-form" {...others}>
        <span styleName="label">{label}</span>
        <span styleName="content">{content}</span>
        {/* { this.state.showEdit */}
        {/* ? <span styleName="button" onClick={() => this._edit()}>修改</span> */}
        {/*: <span> */}
        {/* <span styleName="button-cancel" onClick={() => this._cancel()}>取消</span> */}
        {/* <span styleName="button" onClick={() => this._save()}>保存</span> */}
        {/* </span> */}
        {/* } */}
        {loginHtml}
      </div>
    )
  }
}

export default InputForm
