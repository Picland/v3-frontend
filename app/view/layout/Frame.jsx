import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Frame extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

Frame.propTypes = {
  children: PropTypes.node
}

export default Frame
