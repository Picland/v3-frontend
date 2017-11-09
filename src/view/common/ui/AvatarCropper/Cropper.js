import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'
import Button from '../Button'
// import { isDataUrl } from '../_shared/isDataUrl'

class Cropper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dragging: false,
      image: {},
      mouse: {
        x: null,
        y: null
      },
      preview: null,
      zoom: this.props.zoom
    }

    this.listeners = []
  }

  fitImageToCanvas (width, height) {
    let scaledHeight, scaledWidth

    let canvasAspectRatio = this.props.height / this.props.width
    let imageAspectRatio = height / width

    if (canvasAspectRatio > imageAspectRatio) {
      scaledHeight = this.props.height
      let scaleRatio = scaledHeight / height
      scaledWidth = width * scaleRatio
    } else {
      scaledWidth = this.props.width
      let scaleRatio = scaledWidth / width
      scaledHeight = height * scaleRatio
    }

    return { width: scaledWidth, height: scaledHeight }
  }

  prepareImage (imageUri) {
    let img = new Image()
    // if (!isDataUrl(imageUri)) img.crossOrigin = 'anonymous'
    img.onload = () => {
      let scaledImage = this.fitImageToCanvas(img.width, img.height)
      scaledImage.resource = img
      scaledImage.x = 0
      scaledImage.y = 0
      this.setState({dragging: false, image: scaledImage, preview: this.toDataURL()})
    }
    img.src = imageUri
  }

  mouseDownListener (e) {
    this.setState({
      image: this.state.image,
      dragging: true,
      mouse: {
        x: null,
        y: null
      }
    })
  }

  preventSelection (e) {
    if (this.state.dragging) {
      e.preventDefault()
      return false
    }
  }

  mouseUpListener (e) {
    this.setState({ dragging: false, preview: this.toDataURL() })
  }

  mouseMoveListener (e) {
    if (!this.state.dragging) return

    let mouseX = e.clientX
    let mouseY = e.clientY
    let imageX = this.state.image.x
    let imageY = this.state.image.y

    let newImage = this.state.image

    if (this.state.mouse.x && this.state.mouse.y) {
      let dx = this.state.mouse.x - mouseX
      let dy = this.state.mouse.y - mouseY

      let bounded = this.boundedCoords(imageX, imageY, dx, dy)

      newImage.x = bounded.x
      newImage.y = bounded.y
    }

    this.setState({
      image: this.state.image,
      mouse: {
        x: mouseX,
        y: mouseY
      }
    })
  }

  boundedCoords (x, y, dx, dy) {
    let newX = x - dx
    let newY = y - dy

    let scaledWidth = this.state.image.width * this.state.zoom
    let dw = (scaledWidth - this.state.image.width) / 2
    // let imageLeftEdge = this.state.image.x - dw
    // let imageRightEdge = (imageLeftEdge + scaledWidth)

    let rightEdge = this.props.width
    // let leftEdge = 0

    if (newX - dw > 0) {
      x = dw
    } else if (newX < (-scaledWidth + rightEdge)) {
      x = rightEdge - scaledWidth
    } else {
      x = newX
    }

    let scaledHeight = this.state.image.height * this.state.zoom
    let dh = (scaledHeight - this.state.image.height) / 2
    // let imageTopEdge = this.state.image.y - dh
    // let imageBottomEdge = imageTopEdge + scaledHeight

    let bottomEdge = this.props.height
    // let topEdge = 0
    if (newY - dh > 0) {
      y = dh
    } else if (newY < (-scaledHeight + bottomEdge)) {
      y = bottomEdge - scaledHeight
    } else {
      y = newY
    }

    return { x, y }
  }

  componentDidMount () {
    let canvas = ReactDom.findDOMNode(this.refs.canvas)
    // let context = canvas.getContext('2d')
    this.prepareImage(this.props.image)

    this.listeners = {
      mousemove: e => this.mouseMoveListener(e),
      mouseup: e => this.mouseUpListener(e),
      mousedown: e => this.mouseDownListener(e)
    }

    window.addEventListener('mousemove', this.listeners.mousemove, false)
    window.addEventListener('mouseup', this.listeners.mouseup, false)
    canvas.addEventListener('mousedown', this.listeners.mousedown, false)
    document.onselectstart = e => this.preventSelection(e)
  }

  // make sure we clean up listeners when unmounted.
  componentWillUnmount () {
    let canvas = ReactDom.findDOMNode(this.refs.canvas)
    window.removeEventListener('mousemove', this.listeners.mousemove)
    window.removeEventListener('mouseup', this.listeners.mouseup)
    canvas.removeEventListener('mousedown', this.listeners.mousedown)
  }

  componentDidUpdate () {
    let context = ReactDom.findDOMNode(this.refs.canvas).getContext('2d')
    context.clearRect(0, 0, this.props.width, this.props.height)
    this.addImageToCanvas(context, this.state.image)
  }

  addImageToCanvas (context, image) {
    if (!image.resource) return
    context.save()
    context.globalCompositeOperation = 'destination-over'
    let scaledWidth = this.state.image.width * this.state.zoom
    let scaledHeight = this.state.image.height * this.state.zoom

    let x = image.x - (scaledWidth - this.state.image.width) / 2
    let y = image.y - (scaledHeight - this.state.image.height) / 2

    // need to make sure we aren't going out of bounds here...
    x = Math.min(x, 0)
    y = Math.min(y, 0)
    y = scaledHeight + y >= this.props.height ? y : (y + (this.props.height - (scaledHeight + y)))
    x = scaledWidth + x >= this.props.width ? x : (x + (this.props.width - (scaledWidth + x)))

    context.drawImage(image.resource, x, y, image.width * this.state.zoom, image.height * this.state.zoom)
    context.restore()
  }

  toDataURL () {
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')

    canvas.width = this.props.width
    canvas.height = this.props.height

    this.addImageToCanvas(context, {
      resource: this.state.image.resource,
      x: this.state.image.x,
      y: this.state.image.y,
      height: this.state.image.height,
      width: this.state.image.width
    })

    return canvas.toDataURL()
  }

  handleCrop () {
    let data = this.toDataURL()
    this.props.onCrop(data)
  }

  handleZoomUpdate () {
    let newstate = this.state
    newstate.zoom = ReactDom.findDOMNode(this.refs.zoom).value
    this.setState({newstate})
  }

  render () {
    const { width, height, cropButtonName } = this.props
    const canvasStyle = {
      width: this.props.width / 2,
      height: this.props.height / 2
    }
    return (
      <div className="AvatarCropper-canvas">
        <div className="AvatarCropper-edit">
          <canvas ref="canvas" width={width} height={height} style={canvasStyle} />
        </div>
        <div className="AvatarCropper-zoom">
          <svg viewBox="0 0 18 16" width="14" height="16" aria-hidden="true" style={{height: 16, width: 14}}><title /><g><path d="M13.296 3H1.006C.45 3 0 3.45 0 4.003v10.995C0 15.545.45 16 1.007 16h12.986C14.55 16 15 15.553 15 15V4.003C15 3.456 14.55 3 13.993 3h-.697zm-.892 11H2.596c-.33 0-.596-.266-.596-.6V5.6C2 5.27 2.267 5 2.596 5h9.81c.328 0 .595.266.595.6v7.8c0 .33-.268.6-.596.6zM4 0c-.552 0-1 .448-1 1s.448 1 1 1h11.5s.5 0 .5.5V12c0 .552.448 1 1 1s1-.448 1-1V1c0-.552-.448-1-1-1H4z" fillRule="evenodd" /></g></svg>
          <input
            type="range"
            name="zoom"
            ref="zoom"
            onChange={this.handleZoomUpdate.bind(this)}
            style={{width: this.props.width}}
            min="1"
            max="3"
            step="0.01"
            defaultValue="1"
          />
          <svg viewBox="0 0 18 16" width="21" height="16" aria-hidden="true" style={{height: 16, width: 21}}><title /><g><path d="M13.296 3H1.006C.45 3 0 3.45 0 4.003v10.995C0 15.545.45 16 1.007 16h12.986C14.55 16 15 15.553 15 15V4.003C15 3.456 14.55 3 13.993 3h-.697zm-.892 11H2.596c-.33 0-.596-.266-.596-.6V5.6C2 5.27 2.267 5 2.596 5h9.81c.328 0 .595.266.595.6v7.8c0 .33-.268.6-.596.6zM4 0c-.552 0-1 .448-1 1s.448 1 1 1h11.5s.5 0 .5.5V12c0 .552.448 1 1 1s1-.448 1-1V1c0-.552-.448-1-1-1H4z" fillRule="evenodd" /></g></svg>
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleCrop.bind(this)}>
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
  cropButtonName: PropTypes.string,
  zoom: PropTypes.number
}

Cropper.defaultProps = {
  width: 400,
  height: 400,
  zoom: 1
}

export default Cropper
