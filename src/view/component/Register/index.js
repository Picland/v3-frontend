import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from '../../common/ui/Button/index'
import Input from '../../common/ui/Input/index'
import styles from './index.less'

@CSSModules(styles)
class Register extends Component {
  static propTypes = {
    switchModal: PropTypes.func
  }
  _switchModal () {
    this.props.switchModal()
  }
  render () {
    return (
      <div styleName="register">
        <div>注册</div>
        <div styleName="switch-modal">已有账号， <span onClick={::this._switchModal}>立即登录</span></div>
        <Input styleType="line" placeholder="手机号码" type="text" name="phoneNumber" />
        <Input styleType="line" placeholder="邀请码" type="text" name="inviteCode" />
        <Input styleType="line" placeholder="密码6-16位，区分大小写" type="text" name="password" />
        <Button styleType="wide">注册</Button>
      </div>
    )
  }
}

export default Register
