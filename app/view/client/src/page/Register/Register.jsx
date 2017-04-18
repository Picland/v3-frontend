import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Button from '../../component/Button/Button'
import Input from '../../component/Input/Input'
import CopyRight from '../../component/CopyRight/CopyRight'
import '../../style/core.less'
import styles from './Register.less'

class Register extends Component {
  render () {
    return (
      <div>
        <div styleName='container'>
          <div>注册</div>
          <form method='post'>
            <Input styleType='line' placeholder='手机号码' type='text' name='name' />
            <Input styleType='line' placeholder='邀请码' type='text' name='name' />
            <Input styleType='line' placeholder='密码' type='password' name='password' />
            <Button styleType='wide' type='submit' value='注册'>注册</Button>
          </form>
        </div>
        <CopyRight />
      </div>
    )
  }
}

export default CSSModules(Register, styles)
