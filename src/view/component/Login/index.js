import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import Input from '../../common/ui/Input/index'
import Button from '../../common/ui/Button/'

@CSSModules(styles)
class Login extends Component {
  static propTypes=({
    flashMessage: PropTypes.object,
    switchModal: PropTypes.func
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
    if (value.length < 6) {
      this.setState({
        pwdValid: false,
        pwdHelp: '密码长度须大于6位'
      })
    } else {
      this.setState({
        pwdValid: true
      })
    }
  }
  async _logIn () {
    // 检查数据有效性
    let { account, password, accountValid, pwdValid } = this.state
    this._checkAccount(this.state.account)
    this._checkPassword(this.state.password)
    if (accountValid && pwdValid) {
      await this.props.login({account, password}) // 对应connect里面的login方法不是reduer里面的
      if (this.props.flashMessage.show) {
        this.setState({
          serverError: this.props.flashMessage.msg
        })
      }
    }
  }
  _switchModal () {
    this.props.switchModal()
  }
  // componentWillUpdate (nextProps, nextState) {
  //   // if (nextProps.user) {
  //   //   console.log('nextProps.user', this.props.location)
  //   //   let pathname = this.props.location.state
  //   //     ? this.props.location.state.from.pathname // 从外部因为需要登录跳转过来的逻辑，登录后再跳转到原来的地址
  //   //     : '/settings/prewview' // 默认登录后跳转到首页
  //   //   let redirectState = { from: this.props.location }
  //   //   this.props.redirect(pathname, redirectState)
  //   // }
  // }
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
        <Button styleType="wide" onClick={() => this._logIn()}>登录</Button>
      </div>
    )
  }
}

export default Login
