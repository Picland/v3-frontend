import _ from 'lodash'
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
    this.update = update.bind(this)
    this.props.flashMessage.show && this.props.removeFlashMessage()
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
  handleSubmitAccData () {
    !_.isEmpty(this.state.accData) && this.props.update(this.state.accData)
  }
  handleSubmitPwdData () {
    !_.isEmpty(this.state.pwdData) && this.props.update(this.state.pwdData)
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
                onSubmit={::this.handleSubmitAccData}
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
                onSubmit={::this.handleSubmitPwdData}
                onChange={pwdData => this.update('set', { pwdData })}>
            <FormItem label="原密码" name="password">
              <FormInput size="lg" placeholder="请输入原始密码" />
            </FormItem>
            <FormItem label="新密码" name="newpassword1">
              <FormInput size="lg" placeholder="请输入新密码" />
            </FormItem>
            <FormItem label="确认新密码" name="newpassword2">
              <FormInput size="lg" placeholder="确认新密码" />
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
