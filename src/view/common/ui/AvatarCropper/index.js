import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import Cropper from './Cropper'
import './index.less'

class AvatarCropper extends Component {
  onClose () {
    this.props.onClose && this.props.onClose()
  }

  render () {
    const { image, width, height, onCrop, cropButtonName, open } = this.props
    return (
      <Modal open={open} onClose={::this.onClose} lock>
        <ModalHeader />
        <ModalBody>
          <h3 className="Modal-title">编辑头像</h3>
          <div className="Modal-subtitle">调整头像尺寸和位置</div>
          <div className="modal-body">
            <div className="AvatarCropper-base" ref="avatar">
              <Cropper
                image={image}
                width={width}
                height={height}
                onCrop={onCrop}
                cropButtonName={cropButtonName}
                />
            </div>
          </div>
        </ModalBody>
      </Modal>
    )
  }
}

// The AvatarCropper Prop API
AvatarCropper.propTypes = {
  image: PropTypes.string.isRequired,
  onCrop: PropTypes.func.isRequired,
  cropButtonName: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  // modalSize: PropTypes.oneOf(['lg', 'large', 'sm', 'small']),
  // 是否打开头像裁剪对话框
  open: PropTypes.bool,
  onClose: PropTypes.func
}

AvatarCropper.defaultProps = {
  width: 480,
  height: 480,
  modalSize: 'large',
  closeButtonName: 'Close'
}

export default AvatarCropper
