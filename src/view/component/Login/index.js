import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from '../../common/ui/Button/'
import Input from '../../common/ui/Input/index'
import styles from './index.less'

@CSSModules(styles)
class Login extends Component {
  static propTypes=({
    flashMessage: PropTypes.object,
    switchModal: PropTypes.func,
    login: PropTypes.func
  })
  constructor (props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      loading: false
    }
  }
  _checkAccount (value) {
    // reset state first everytime
    this.setState({
      accountValid: false,
      accountHelp: ''
    })
    if (!(/^1[34578]\d{9}$/.test(value))) {
      this.setState({
        accountValid: false,
        accountHelp: '手机号码格式不对'
      })
    } else {
      this.setState({
        accountValid: true
      })
    }
  }
  _checkPassword (value) {
    this.setState({
      pwdValid: false,
      pwdHelp: ''
    })
    if (value.length < 6 || value.length > 16) {
      this.setState({
        pwdValid: false,
        pwdHelp: '密码长度须6-16位'
      })
    } else {
      this.setState({
        pwdValid: true
      })
    }
  }
  async _logIn () {
    let { account, password, accountValid, pwdValid } = this.state
    this._checkAccount(account)
    this._checkPassword(password)
    if (accountValid && pwdValid) {
      await this.props.login({account, password})
      if (this.props.flashMessage.type === 'error') {
        this.setState({
          serverError: this.props.flashMessage.message
        })
      }
    }
  }
  _switchModal () {
    this.props.switchModal()
  }
  render () {
    return (
      <div styleName="login">
        <div>登录</div>
        <div styleName="switch-modal">还没有账号， <span onClick={::this._switchModal}>立即注册</span></div>
        <Input styleType="line"
               placeholder="手机号码"
               type="text"
               name="account"
               onChange={(event) => this.setState({account: event.target.value})}
               onBlur={(event) => this._checkAccount(event.target.value)}
               validationState={this.state.accountValid}
               help={this.state.accountHelp}
         />
        <Input styleType="line"
               placeholder="密码"
               type="password"
               name="password"
               onChange={(event) => this.setState({password: event.target.value})}
               onBlur={(event) => this._checkPassword(event.target.value)}
               validationState={this.state.pwdValid}
               help={this.state.pwdHelp}
         />
        {this.state.serverError && <div styleName="server-error">{this.state.serverError}</div>}
        <Button styleType="wide" onClick={::this._logIn}>登录</Button>
      </div>
    )
  }
}

export default Login
