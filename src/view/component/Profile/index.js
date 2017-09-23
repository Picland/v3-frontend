import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputNew from '_common_ui/InputNew'
import Upload from '_common_ui/Upload'
import Button from '_common_ui/Button'
import AvatarUpload from '_common_ui/AvatarUpload'
import message from '_common_ui/message'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    flashMessage: PropTypes.object,
    update: PropTypes.func,
    updateAvatarLogined: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
  }
  async _save () {
    if (!_.isEmpty(this.state.formData)) {
      await this.props.update(this.state.formData)
    }
  }
  componentDidUpdate () {
    this.props.flashMessage.type === 'success' && message.success(this.props.flashMessage.message)
    this.props.flashMessage.type === 'error' && message.danger(this.props.flashMessage.message)
  }
  _uploadComplete (data) {
    this.props.updateAvatarLogined(data)
  }
  _handleChange (name, value) {
    this.state.formData[name] = value
  }
  render () {
    let { userInfo } = this.props
    return (
      <div styleName="container">
        <div styleName="card">
          <div styleName="left">
            <div styleName="title">基本信息</div>
            <InputNew label="昵称"
                      name="name"
                      value={userInfo.name}
                      onChange={::this._handleChange}
            />
            <InputNew label="性别"
                      name="gender"
                      value={userInfo.gender}
                      onChange={::this._handleChange}
            />
            <InputNew label="简介"
                      name="bio"
                      value={userInfo.bio}
                      onChange={::this._handleChange}
            />
            <Button styleType="primary" onClick={::this._save}>保存</Button>
          </div>
          <div styleName="right">
            <div styleName="upload-avatar">
              <Upload method="post"
                      action="/api/v1/updateUserAvatar"
                      button="更换头像"
                      onComplete={::this._uploadComplete}>
                <AvatarUpload
                  src={userInfo.avatar}
                  size="larger" />
              </Upload>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
