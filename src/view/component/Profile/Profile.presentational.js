import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'react-update'
import CSSModules from 'react-css-modules'
import Upload from '_common_ui/Upload'
import Avatar from '_common_ui/Avatar'
import message from '_common_ui/message'
import { Form, FormItem, FormSubmit, FormInput, FormSelect, Option } from '_common_ui/Form'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  constructor (props) {
    super(props)
    this.props.flashMessage.show && this.props.removeFlashMessage()
    this.update = update.bind(this)
    this.rules = {
      name (v) {
        if (!v) return '请填写昵称'
        if (v.length > 30) return '昵称不能超过30个字符'
      },
      bio (v) {
        if (v.length > 60) return '昵称不能超过60个字符'
      }
    }
    this.state = {
      formData: {
        name: this.props.userInfo.name,
        gender: this.props.userInfo.gender,
        bio: this.props.userInfo.bio
      }
    }
  }
  uploadComplete (result) {
    this.props.updateAvatarLogined(result)
  }
  handleSubmit (data) {
    this.props.update(data)
  }
  componentWillUpdate (nextProps) {
    nextProps.flashMessage.type === 'success' && message.success(nextProps.flashMessage.message)
    nextProps.flashMessage.type === 'error' && message.danger(nextProps.flashMessage.message)
  }
  componentDidUpdate () {
    this.props.flashMessage.show && this.props.removeFlashMessage()
  }
  render () {
    let { formData } = this.state
    let { userInfo } = this.props
    return (
      <div styleName="container">
        <div styleName="card">
          <div styleName="left">
            <div styleName="title">基本信息</div>
            <Form size="lg"
                  data={formData}
                  rules={this.rules}
                  onSubmit={::this.handleSubmit}
                  onChange={formData => this.update('set', { formData })}>
              <FormItem label="昵称" name="name" required>
                <FormInput size="lg" />
              </FormItem>
              <FormItem label="性别" name="gender">
                <FormSelect width={460} size="lg">
                  <Option value="m">男</Option>
                  <Option value="f">女</Option>
                  <Option value="x">不详</Option>
                </FormSelect>
              </FormItem>
              <FormItem label="简介" name="bio">
                <FormInput size="lg" />
              </FormItem>
              <FormSubmit size="lg" >保存</FormSubmit>
            </Form>
          </div>
          <div styleName="right">
            <div styleName="upload-avatar">
              <Upload method="post"
                      action="/api/v1/updateUserAvatar"
                      button="更换头像"
                      onComplete={::this.uploadComplete}>
                <Avatar
                  src={userInfo.avatar}
                  size="lg" />
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
  updateAvatarLogined: PropTypes.func,
  removeFlashMessage: PropTypes.func
}

export default Profile
