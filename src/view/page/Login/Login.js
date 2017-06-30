import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Button from '../../component/Button/Button'
import Input from '../../component/Input/Input'
import CopyRight from '../../component/CopyRight/CopyRight'
import Header from '../../layout/Header'
import styles from './Login.less'

@CSSModules(styles)
class Login extends Component {
  render () {
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/register" buttonName="注册" />
        <div styleName="main">
          <div>登录</div>
          <form method="post">
            <Input styleType="line" placeholder="手机号码" type="text" name="phoneNumber" />
            <Input styleType="line" placeholder="密码" type="password" name="password" />
            <Button styleType="wide" type="submit" value="登录">登录</Button>
          </form>
        </div>
        <CopyRight />
      </div>
    )
  }
}

export default Login
