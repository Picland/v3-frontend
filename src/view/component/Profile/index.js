import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputNew from '_common_ui/InputNew'
import Upload from '_common_ui/Upload'
import Button from '_common_ui/Button'
import AvatarUpload from '_common_ui/AvatarUpload'
import message from '_common_ui/message'
import { Select, Option } from '_common_ui/Select'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
  }
  _uploadComplete (data) {
    this.props.updateAvatarLogined(data)
  }
  _handleChange (value, name) {
    this.state.formData[name] = value
  }
  _save () {
    !_.isEmpty(this.state.formData) && this.props.update(this.state.formData)
  }
  componentDidUpdate () {
    this.props.flashMessage.type === 'success' && message.success(this.props.flashMessage.message)
    this.props.flashMessage.type === 'error' && message.danger(this.props.flashMessage.message)
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
            <div styleName="label">性别</div>
            <Select minWidth={460}
                    defaultValue={userInfo.gender}
                    onChange={(value, name) => this._handleChange(value, 'gender')}>
              <Option value="m">男</Option>
              <Option value="f">女</Option>
              <Option value="x">不详</Option>
            </Select>
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

Profile.propTypes = {
  userInfo: PropTypes.object,
  flashMessage: PropTypes.object,
  update: PropTypes.func,
  updateAvatarLogined: PropTypes.func
}

export default Profile
