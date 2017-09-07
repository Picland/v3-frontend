import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputNew from '../../common/ui/InputNew'
import Button from '../../common/ui/Button'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    update: PropTypes.func
  }
  async _save () {
    !_.isEmpty(this.state.formData) && await this.props.update(this.state.formData)
  }
  async _savePassword (name, value) {
    !_.isEmpty(this.state.formData) && await this.props.update(this.state.formData)
  }
  _handleChange (name, value) {
    this.state.formData[name] = value
  }
  render () {
    let { user } = this.props
    return (
      <div styleName="container">
        <div styleName="card">
          <div styleName="title">账号</div>
          <InputNew label="邮箱"
                    name="name"
                    value={user.name}
                    onChange={::this._handleChange}
          />
          <InputNew label="手机"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={::this._handleChange}
                    hasbutton
          />
          <Button styleType="primary" onClick={::this._save}>保存</Button>
        </div>
        <div styleName="card">
          <div styleName="title">密码</div>
          <InputNew label="原密码"
                    name="password"
                    type="text"
                    placeholder="请输入原始密码"
                    value={user.password}
                    onChange={::this._handleChange}
          />
          <InputNew label="新密码"
                    name="password"
                    type="text"
                    placeholder="请输入新密码"
                    value={user.password}
                    onChange={::this._handleChange}
          />
          <InputNew label="确认密码"
                    name="password"
                    type="text"
                    placeholder="请确认新密码"
                    value={user.password}
                    onChange={::this._handleChange}
          />
          <Button styleType="primary" onClick={::this._savePassword}>保存</Button>
        </div>
      </div>
    )
  }
}

export default Profile
