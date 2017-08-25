import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputForm from '../../common/ui/InputForm'
import Button from '../../common/ui/Button'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    update: PropTypes.func
  }
  async _save (name, value) {
    console.log('Profile的save', value)
    console.log('name', name)
    console.log('value', value)
    const formData = {}
    formData[name] = value
    await this.props.update(formData)
  }
  _handleChange (name, value) {

  }
  render () {
    let { user } = this.props
    return (
      <div styleName="container">
        <div styleName="title">账号</div>
        <InputForm label="邮箱"
                   name="name"
                   content={user.name}
                   save={(n, v) => this._save(n, v)}
                   onChange={(v) => this._handleChange(v)}
                   hasbutton
        />
        <InputForm label="手机"
                   name="phoneNumber"
                   content={user.phoneNumber}
                   save={(n, v) => this._save(n, v)}
                   onChange={(v) => this._handleChange(v)}
                   hasbutton
        />
        <div styleName="title2">密码</div>
        <InputForm label="原密码"
                   name="password"
                   type="text"
                   placeholder="请输入原始密码"
                   content={user.password}
                   onChange={(v) => this._handleChange(v)}
        />
        <InputForm label="新密码"
                   name="password"
                   type="text"
                   placeholder="请输入新密码"
                   content={user.password}
                   onChange={(v) => this._handleChange(v)}
        />
        <InputForm label="确认密码"
                   name="password"
                   type="text"
                   placeholder="请确认新密码"
                   content={user.password}
                   onChange={(v) => this._handleChange(v)}
        />
        <Button styleType="primary" styleName="btn-save">保存</Button>
      </div>
    )
  }
}

export default Profile
