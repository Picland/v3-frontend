import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/core.less'

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
