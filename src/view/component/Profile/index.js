import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'react-update'
import CSSModules from 'react-css-modules'
import Upload from '_common_ui/Upload'
import AvatarUpload from '_common_ui/AvatarUpload'
import message from '_common_ui/message'
import { Form, FormItem, FormSubmit, FormInput, FormSelect, Option } from '_common_ui/Form'
import styles from './index.less'

@CSSModules(styles)
class Profile extends Component {
  constructor (props) {
    super(props)
    this.update = update.bind(this)
    this.props.flashMessage.show && this.props.removeFlashMessage()
    this.state = {
      formData: {
        name: this.props.userInfo.name,
        gender: this.props.userInfo.gender,
        bio: this.props.userInfo.bio
      }
    }
  }
  uploadComplete (data) {
    this.props.updateAvatarLogined(data)
  }
  handleSubmit () {
    !_.isEmpty(this.state.formData) && this.props.update(this.state.formData)
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
            <Form data={formData}
                  onSubmit={::this.handleSubmit}
                  onChange={formData => this.update('set', { formData })}>
              <FormItem label="昵称" name="name" required>
                <FormInput size="lg" />
              </FormItem>
              <FormItem label="性别" name="gender">
                <FormSelect minWidth={460}>
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
  updateAvatarLogined: PropTypes.func,
  removeFlashMessage: PropTypes.func
}

export default Profile
