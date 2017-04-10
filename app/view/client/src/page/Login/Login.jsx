import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Header from '../../component/common/Header'
import Button from '../../component/common/Button'
import styles from './Login.less'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <div styleName='contianer'>
          <div>登录</div>
          <div>
            <form method='post'>
              <div>
                <label>用户名</label>
                <input placeholder='用户名' type='text' name='name' />
              </div>
              <div>
                <label>密码</label>
                <input placeholder='密码' type='password' name='password' />
              </div>
              <Button htmlType='submit' value='登录' type='wide'>登录</Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
