import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Button from '../../component/Button/Button'
import Input from '../../component/Input/Input'
import CopyRight from '../../component/CopyRight/CopyRight'
import Header from '../../layout/Header'
import '../../style/core.less'
import styles from './Register.less'

class Register extends Component {
  render () {
    return (
      <div styleName='container'>
        <Header logoName='木纹子印象派' buttonLink='/login' buttonName='登录' />
        <div styleName='main'>
          <div styleName='title'>注册</div>
          <form method='post' encType='multipart/form-data'>
            <Input styleType='line' placeholder='手机号码' type='text' name='phoneNumber' />
            <Input styleType='line' placeholder='昵称' type='text' name='name' />
            <Input styleType='line' placeholder='邀请码' type='text' name='inviteCode' />
            <Input styleType='line' placeholder='密码至少6位' type='password' name='password' />
            <Input styleType='line' placeholder='重复密码' type='password' name='repassword' />
            <Button styleType='wide' type='submit' value='注册'>注册</Button>
          </form>
        </div>
        <CopyRight />
      </div>
    )
  }
}

export default CSSModules(Register, styles)
