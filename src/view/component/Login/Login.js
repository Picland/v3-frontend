import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
// import autobind from 'autobind-decorator'
import styles from '../../component/Login/Login.less'
import Header from '../../layout/Header'
import Button from '../../common/ui/Button/Button'
import Input from '../../common/ui/Input/Input'
import CopyRight from '../../common/ui/CopyRight/CopyRight'

// @autobind
@CSSModules(styles)
class Login extends Component {
  static propTypes=({
    user: PropTypes.object,
    loginIn: PropTypes.func,
    redirect: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.object
    })
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
        pwdHelp: '密码长度需要大于6位'
      })
    } else {
      this.setState({
        pwdValid: true
      })
    }
  }
  async _signIn () {
    // 检查数据有效性
    let { account, password, accountValid, pwdValid } = this.state
    this._checkAccount(this.state.account)
    this._checkPassword(this.state.password)
    accountValid && pwdValid &&
      await this.props.loginIn({account, password}) // 对应connect里面的login方法不是reduer里面的
  }
  componentWillUpdate (nextProps, nextState) {
    if (nextProps.user) {
      let pathname = this.props.location.state
        ? this.props.location.state.from.pathname // 从外部因为需要登录跳转过来的逻辑，登录后再跳转到原来的地址
        : '/settings/prewview' // 默认登录后跳转到首页
      let redirectState = { from: this.props.location }
      this.props.redirect(pathname, redirectState)
    }
  }
  render () {
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/register" buttonName="注册" />
        <div styleName="main">
          <div>登录</div>
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
          <Button styleType="wide" onClick={() => this._signIn()}>登录</Button>
        </div>
        <CopyRight />
      </div>
    )
  }
}

export default Login
