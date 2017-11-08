import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import Cropper from './Cropper'
import './index.less'

class AvatarCropper extends Component {
  render () {
    const { onRequestHide, image, width, height, onCrop,
            closeButtonName, cropButtonName, open } = this.props
    return (
      <Modal open={open} lock>
        <ModalHeader />
        <ModalBody>
          <div className="modal-body">
            <div className="AvatarCropper-base">
              <Cropper
                image={image}
                width={width}
                height={height}
                onCrop={onCrop}
                onRequestHide={onRequestHide}
                closeButtonName={closeButtonName}
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
  closeButtonName: PropTypes.string,
  cropButtonName: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  // modalSize: PropTypes.oneOf(['lg', 'large', 'sm', 'small']),
  onRequestHide: PropTypes.func.isRequired,
  // 是否打开头像裁剪对话框
  open: PropTypes.bool
}

AvatarCropper.defaultProps = {
  width: 400,
  height: 400,
  modalSize: 'large',
  closeButtonName: 'Close',
  cropButtonName: 'Crop and Save'
}

export default AvatarCropper
