import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'react-update'
import CSSModules from 'react-css-modules'
import message from '_common_ui/message'
import { Form, FormItem, FormSubmit, FormInput } from '_common_ui/Form'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  constructor (props) {
    super(props)
    this.props.flashMessage.show && this.props.removeFlashMessage()
    this.update = update.bind(this)
    this.rulesOfAccount = {
      email (v) {
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
            .test(v)) return '邮箱格式不正确'
      }
    }
    this.rulesOfPassword = {
      password (v) {
        if (v.length > 16) return '密码长度不超过16位'
      },
      newpassword1 (v) {
        if (v.length > 16) return '密码长度不超过16位'
      },
      newpassword2 (v) {
        if (v.length > 16) return '密码长度不超过16位'
      }
    }
    this.state = {
      accData: {
        email: this.props.userInfo.email,
        phoneNumber: this.props.userInfo.phoneNumber
      },
      pwdData: {
        password: '',
        newpassword1: '',
        newpassword2: ''
      }
    }
  }
  handleSubmit (data) {
    this.props.update(data)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.flashMessage.type === 'success') {
      message.success(nextProps.flashMessage.message)
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
  componentDidUpdate () {
    this.props.flashMessage.show && this.props.removeFlashMessage()
  }
  render () {
    let { accData, pwdData } = this.state
    return (
      <div styleName="container">
        <div styleName="card">
          <div styleName="title">账号</div>
          <Form data={accData}
                rules={this.rulesOfAccount}
                onSubmit={::this.handleSubmit}
                onChange={accData => this.update('set', { accData })}>
            <FormItem label="邮箱" name="email">
              <FormInput size="lg" />
            </FormItem>
            <FormItem label="手机" name="phoneNumber" required>
              <FormInput size="lg" disabled />
            </FormItem>
            <FormSubmit size="lg" >保存</FormSubmit>
          </Form>
        </div>
        <div styleName="card">
          <div styleName="title">密码</div>
          <Form data={pwdData}
                rules={this.rulesOfPassword}
                onSubmit={::this.handleSubmit}
                onChange={pwdData => this.update('set', { pwdData })}>
            <FormItem label="原密码" name="password">
              <FormInput type="password" size="lg" placeholder="请输入原始密码" />
            </FormItem>
            <FormItem label="新密码" name="newpassword1">
              <FormInput type="password" size="lg" placeholder="请输入新密码" />
            </FormItem>
            <FormItem label="确认新密码" name="newpassword2">
              <FormInput type="password" size="lg" placeholder="确认新密码" />
            </FormItem>
            {this.state.serverError && <div styleName="server-error">{this.state.serverError}</div>}
            <FormSubmit size="lg" >保存</FormSubmit>
          </Form>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  userInfo: PropTypes.object,
  flashMessage: PropTypes.object,
  update: PropTypes.func,
  removeFlashMessage: PropTypes.func
}

export default Profile
