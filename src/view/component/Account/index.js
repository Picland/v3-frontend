import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputNew from '_common_ui/InputNew'
import Button from '_common_ui/Button'
import message from '_common_ui/message'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    flashMessage: PropTypes.object,
    update: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      formData: {},
      pwdData: {}
    }
  }
  async _save () {
    !_.isEmpty(this.state.formData) && await this.props.update(this.state.formData)
  }
  _savePassword () {
    if (!_.isEmpty(this.state.pwdData)) {
      this.props.update(this.state.pwdData)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.flashMessage.type === 'success') {
      message.success(nextProps.flashMessage.message, 0)
      this.setState({
        serverError: ''
      })
    }
    if (nextProps.flashMessage.type === 'error') {
      this.setState({
        serverError: nextProps.flashMessage.message
      })
    }
  }
  _handleChange (name, value) {
    this.state.formData[name] = value
  }
  _handleChangePwd (name, value) {
    this.state.pwdData[name] = value
  }
  render () {
    let { userInfo } = this.props
    userInfo.newpassword1 = ''
    userInfo.newpassword2 = ''
    return (
      <div styleName="container">
        <div styleName="card">
          <div styleName="title">账号</div>
          <InputNew label="邮箱"
                    name="email"
                    value={userInfo.email}
                    onChange={::this._handleChange}
          />
          <InputNew label="手机"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={::this._handleChange}
                    hasbutton
          />
          <Button size="lg" onClick={::this._save}>保存</Button>
        </div>
        <div styleName="card">
          <div styleName="title">密码</div>
          <InputNew label="原密码"
                    name="password"
                    type="text"
                    placeholder="请输入原始密码"
                    value={userInfo.password}
                    onChange={::this._handleChangePwd}
          />
          <InputNew label="新密码"
                    name="newpassword1"
                    type="text"
                    placeholder="请输入新密码"
                    value={userInfo.newpassword1}
                    onChange={::this._handleChangePwd}
          />
          <InputNew label="确认新密码"
                    name="newpassword2"
                    type="text"
                    placeholder="请确认新密码"
                    value={userInfo.newpassword2}
                    onChange={::this._handleChangePwd}
          />
          {this.state.serverError && <div styleName="server-error">{this.state.serverError}</div>}
          <Button size="lg" onClick={::this._savePassword}>保存</Button>
        </div>
      </div>
    )
  }
}

export default Profile
