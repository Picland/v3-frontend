import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Header from '../../component/common/Header'
import CopyRight from '../../component/common/CopyRight'
import Button from '../../component/common/Button'
import Input from '../../component/common/Input'
import styles from './Login.less'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <div styleName='container'>
          <div>登录</div>
          <form method='post'>
            <Input styleType='line' placeholder='手机号码' type='text' name='name' />
            <Input styleType='line' placeholder='密码' type='password' name='password' />
            <Button styleType='wide' type='submit' value='登录'>登录</Button>
          </form>
        </div>
        <CopyRight />
      </div>
    )
  }
}

export default CSSModules(App, styles)
