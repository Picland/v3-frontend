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
    user: PropTypes.object,
    update: PropTypes.func,
    updateAfterUpload: PropTypes.func
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
    this.props.updateAfterUpload(data)
  }
  _handleChange (name, value) {
    this.state.formData[name] = value
  }
  render () {
    let { user } = this.props
    return (
      <div styleName="container">
        <div styleName="left">
          <div styleName="title">基本信息</div>
          <InputNew label="昵称"
                     name="name"
                     value={user.name}
                     onChange={::this._handleChange}
          />
          <InputNew label="性别"
                     name="gender"
                     value={user.gender}
                     onChange={::this._handleChange}
          />
          <InputNew label="简介"
                     name="bio"
                     value={user.bio}
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
                src={user.avatar}
                size="larger" />
            </Upload>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
