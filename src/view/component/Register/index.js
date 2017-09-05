import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from '../../common/ui/Button/index'
import Input from '../../common/ui/Input/index'
import Upload from '../../common/ui/Upload/index'
import styles from './index.less'

@CSSModules(styles)
class Register extends Component {
  static propTypes = {
    userId: PropTypes.string,
    // flashMessage: PropTypes.object,
    switchModal: PropTypes.func,
    update: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      account: '',
      password: '',
      inviteCode: '',
      nickName: '',
      loading: false,
      pwdInputType: 'text',
      join: false
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
  _checkInviteCode (value) {
    this.setState({
      inviteCodeValid: false,
      inviteCodeHelp: ''
    })
    if (!value.length) {
      this.setState({
        inviteCodeValid: false,
        inviteCodeHelp: '请输入邀请码'
      })
    } else {
      this.setState({
        inviteCodeValid: true
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
  _checkNickName (value) {
    this.setState({
      nickNameValid: false,
      nickNameHelp: ''
    })
    if (value.length < 1 || value.length > 20) {
      this.setState({
        nickNameValid: false,
        nickNameHelp: '昵称必填，且不超过10个汉字或20个英文字符'
      })
    } else {
      this.setState({
        nickNameValid: true
      })
    }
  }
  async _register () {
    let { account, inviteCode, password, accountValid, inviteCodeValid, pwdValid } = this.state
    // let { flashMessage } = this.props
    // 客户端先检查数据有效性
    this._checkAccount(account)
    this._checkInviteCode(inviteCode)
    this._checkPassword(password)
    if (accountValid && inviteCodeValid && pwdValid) {
      // 对应connect里面props的register方法，不是reduer里面的
      await this.props.register({account, inviteCode, password})
      // 注册错误：显示服务器端传来的错误信息
      if (this.props.flashMessage.type === 'error') {
        this.setState({
          serverError: this.props.flashMessage.message
        })
      }
      // 注册最后一步：打开上传头像的对话框
      if (this.props.flashMessage.type === 'success') {
        window.runtime = {
          userId: this.props.userId
          // userId: '59ac077391853dd6d21fb3d1'
        }
        this.setState({
          join: true,
          serverError: ''
        })
      }
    }
  }
  async _fishRegister () {
    let { nickName, nickNameValid } = this.state
    this._checkNickName(nickName)
    if (nickNameValid) {
      const formData = {}
      formData.name = nickName
      await this.props.update(formData)
      // 注册错误：显示服务器端传来的错误信息
      // if (this.props.flashMessage.type === 'error') {
      //   this.setState({
      //     serverError: this.props.flashMessage.message
      //   })
      // }
    }
  }
  _switchModal () {
    this.props.switchModal()
  }
  _handleFocus () {
    this.setState({pwdInputType: 'password'})
  }
  _handleUploading (pre) {
    console.log('uploading...', pre)
  }

  _handleComplete (data, list) {
    console.log('complete:', data, 'list:', list)
  }
  render () {
    let { join } = this.state
    return (
      <div styleName="register">
        {
          !join
            ? <div>
              <div styleName="title">注册</div>
              <div styleName="switch-modal">已有账号， <span onClick={::this._switchModal}>立即登录</span></div>
              <Input styleType="line"
                     placeholder="手机号码"
                     type="text"
                     name="phoneNumber"
                     onChange={(event) => this.setState({account: event.target.value})}
                     onBlur={(event) => this._checkAccount(event.target.value)}
                     validationState={this.state.accountValid}
                     help={this.state.accountHelp}
              />
              <Input styleType="line"
                     placeholder="邀请码"
                     type="text"
                     name="inviteCode"
                     onChange={(event) => this.setState({inviteCode: event.target.value})}
                     onBlur={(event) => this._checkInviteCode(event.target.value)}
                     validationState={this.state.inviteCodeValid}
                     help={this.state.inviteCodeHelp}
              />
              <Input styleType="line"
                     placeholder="密码6-16位，区分大小写"
                     type={this.state.pwdInputType}
                     name="password"
                     onFocus={::this._handleFocus}
                     onChange={(event) => this.setState({password: event.target.value})}
                     onBlur={(event) => this._checkPassword(event.target.value)}
                     validationState={this.state.pwdValid}
                     help={this.state.pwdHelp}
              />
              {this.state.serverError && <div styleName="server-error">{this.state.serverError}</div>}
              <Button styleType="wide" onClick={::this._register}>注册</Button>
            </div>
            : <div>
              <div styleName="title-join">Hi, 欢迎加入!</div>
              <Upload method="post"
                      action="/api/v1/updateUserAvatar"
                      onUplading={::this._handleUploading}
                      onComplete={::this._handleComplete}
              />
              <Input styleType="line"
                     placeholder="输入昵称，不超过10个汉字或20个英文字符"
                     type="text"
                     name="name"
                     value={this.state.nickName}
                     onChange={(event) => this.setState({nickName: event.target.value})}
                     onBlur={(event) => this._checkNickName(event.target.value)}
              />
              {this.state.serverError && <div styleName="server-error">{this.state.serverError}</div>}
              {this.state.nickNameHelp && <div styleName="server-error">{this.state.nickNameHelp}</div>}
              <Button styleType="wide" onClick={::this._fishRegister}>完成</Button>
            </div>
        }
      </div>
    )
  }
}

export default Register
