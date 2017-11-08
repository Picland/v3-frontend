import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AvatarCropper from '_common_ui/AvatarCropper'
import Upload from '_common_ui/Upload'
import Avatar from '_common_ui/Avatar'
import xhr from '_common_ui/xhr'

class AvatarCropperTest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cropperOpen: false,
      img: null,
      croppedImg: this.props.imgSrc
    }
  }
  handleRequestHide () {
    this.setState({
      cropperOpen: false
    })
  }
  onUpload (files) {
    let reader = new FileReader()
    let file = files[0]

    if (!file) return

    reader.onload = function (img) {
      this.setState({
        img: img.target.result,
        croppedImg: this.state.croppedImg,
        cropperOpen: true
      })
    }.bind(this)

    reader.readAsDataURL(file)
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
    const self = this
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
      },
      error: msg => {
        console.error('error!', msg)
      },
      complete: () => {
        self.setState({
          cropperOpen: false,
          img: null
        })
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
            <Avatar src={this.state.croppedImg} size="lg" />
          </Upload>
        </div>
        {this.state.cropperOpen &&
          <AvatarCropper
            onRequestHide={::this.handleRequestHide}
            open={this.state.cropperOpen}
            onCrop={::this.handleCrop}
            image={this.state.img}
            width={400}
            height={400}
          />
        }
      </div>
    )
  }
}

AvatarCropperTest.propTypes = {
  imgSrc: PropTypes.string,
  onComplete: PropTypes.func
}

export default AvatarCropperTest
