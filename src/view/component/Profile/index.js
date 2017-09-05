import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import InputNew from '../../common/ui/InputNew'
import Upload from '../../common/ui/Upload'
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
        <div styleName="left">
          <div styleName="title">基本信息</div>
          <InputNew label="昵称"
                     name="name"
                     content={user.name}
                     save={(n, v) => this._save(n, v)}
                     onChange={(v) => this._handleChange(v)}
          />
          <InputNew label="性别"
                     name="gender"
                     content={user.gender}
                     save={(n, v) => this._save(n, v)}
                     onChange={(v) => this._handleChange(v)}
          />
          <InputNew label="简介"
                     name="bio"
                     content={user.bio}
                     save={(n, v) => this._save(n, v)}
                     onChange={(v) => this._handleChange(v)}
          />
          <Button styleType="primary">保存</Button>
        </div>
        <div styleName="right">
          <div>
            <Upload method="post"
                    action="/api/v1/updateUserAvatar"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
