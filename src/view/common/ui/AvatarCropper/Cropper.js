import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import AvatarEditor from 'react-avatar-editor'

class Cropper extends Component {
  constructor () {
    super()
    this.state = {
      scale: 1
    }
  }

  setEditorRef (editor) {
    if (editor) this.editor = editor
  }

  handleScale (e) {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handleSave () {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    this.props.onCrop(img)
  }

  render () {
    const { image, width, height, cropButtonName } = this.props
    return (
      <div className="AvatarCropper-canvas">
        <div className="AvatarCropper-edit">
          <AvatarEditor
            ref={::this.setEditorRef}
            image={image}
            width={width}
            height={height}
            border={40}
            color={[248, 249, 250, 0.9]} // RGBA
            scale={this.state.scale}
            rotate={0}
          />
        </div>
        <div className="AvatarCropper-zoom">
          <svg viewBox="0 0 18 16" width="14" height="16" aria-hidden="true" style={{height: 16, width: 14}}><title /><g><path d="M13.296 3H1.006C.45 3 0 3.45 0 4.003v10.995C0 15.545.45 16 1.007 16h12.986C14.55 16 15 15.553 15 15V4.003C15 3.456 14.55 3 13.993 3h-.697zm-.892 11H2.596c-.33 0-.596-.266-.596-.6V5.6C2 5.27 2.267 5 2.596 5h9.81c.328 0 .595.266.595.6v7.8c0 .33-.268.6-.596.6zM4 0c-.552 0-1 .448-1 1s.448 1 1 1h11.5s.5 0 .5.5V12c0 .552.448 1 1 1s1-.448 1-1V1c0-.552-.448-1-1-1H4z" fillRule="evenodd" /></g></svg>
          <input
            type="range"
            name="zoom"
            ref="zoom"
            onChange={::this.handleScale}
            min="1"
            max="3"
            step="0.01"
            defaultValue="1"
            className="range-input"
          />
          <svg viewBox="0 0 18 16" width="21" height="16" aria-hidden="true" style={{height: 16, width: 21}}><title /><g><path d="M13.296 3H1.006C.45 3 0 3.45 0 4.003v10.995C0 15.545.45 16 1.007 16h12.986C14.55 16 15 15.553 15 15V4.003C15 3.456 14.55 3 13.993 3h-.697zm-.892 11H2.596c-.33 0-.596-.266-.596-.6V5.6C2 5.27 2.267 5 2.596 5h9.81c.328 0 .595.266.595.6v7.8c0 .33-.268.6-.596.6zM4 0c-.552 0-1 .448-1 1s.448 1 1 1h11.5s.5 0 .5.5V12c0 .552.448 1 1 1s1-.448 1-1V1c0-.552-.448-1-1-1H4z" fillRule="evenodd" /></g></svg>
        </div>
        <div className="AvatarCropper-footer">
          <Button onClick={::this.handleSave}>
            {cropButtonName}
          </Button>
        </div>

      </div>
    )
  }
}
Cropper.propTypes = {
  image: PropTypes.string.isRequired,
  onCrop: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  cropButtonName: PropTypes.string
}

Cropper.defaultProps = {
  width: 400,
  height: 400,
  zoom: 1
}

export default Cropper
