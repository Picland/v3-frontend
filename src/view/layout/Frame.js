import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../common/style/core.less'

class Frame extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Frame
