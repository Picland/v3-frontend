import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputNew from '../../common/ui/InputNew'
import Upload from '../../common/ui/Upload'
import Button from '../../common/ui/Button'
import AvatarUpload from '../../common/ui/AvatarUpload'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
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
    !_.isEmpty(this.state.formData) && await this.props.update(this.state.formData)
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
