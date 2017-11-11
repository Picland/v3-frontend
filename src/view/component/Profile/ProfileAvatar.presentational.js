import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classlist from 'classlist'
import AvatarCropper from '_common_ui/AvatarCropper'
import Upload from '_common_ui/Upload'
import Avatar from '_common_ui/Avatar'
import xhr from '_common_ui/xhr'

class ProfileAvatar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cropperOpen: false,
      img: null,
      imgSrc: this.props.imgSrc
    }
  }
  onUpload (files) {
    let reader = new FileReader()
    let file = files[0]
    if (!file) return

    reader.onload = function (img) {
      this.setState({
        img: img.target.result,
        cropperOpen: true
      })
    }.bind(this)

    reader.readAsDataURL(file)
  }
  // 当对话框点击X按钮时候回调
  onClose () {
    this.setState({
      cropperOpen: false
    })
  }
  dataURLtoBlob (dataURL) {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
  }
  handleCrop (dataURL) {
    const blob = this.dataURLtoBlob(dataURL)

    xhr.header = {
      userId: window.runtime.userId
    }

    const fd = new FormData()
    // API: https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/append
    fd.append('files', blob, 'image.jpg')

    xhr({
      type: 'post',
      url: '/api/v1/updateUserAvatar',
      data: fd,
      success: data => {
        this.props.onComplete(data)
        // TODO remove body open dialog class
        const body = document.body
        classlist(body).remove('cmui-modal--open')
        body.style.paddingRight = ''
      },
      error: msg => {
        console.error('error!', msg)
      }
    })
  }
  render () {
    return (
      <div>
        <div styleName="avatar-photo">
          <Upload
            button="更换头像"
            onUpload={::this.onUpload}
          >
            <Avatar src={this.state.imgSrc} size="lg" />
          </Upload>
        </div>
        {this.state.cropperOpen &&
          <AvatarCropper
            open={this.state.cropperOpen}
            onCrop={::this.handleCrop}
            onClose={::this.onClose}
            cropButtonName="保存"
            image={this.state.img}
            width={160}
            height={160}
          />
        }
      </div>
    )
  }
}

ProfileAvatar.propTypes = {
  imgSrc: PropTypes.string,
  onComplete: PropTypes.func
}

export default ProfileAvatar
