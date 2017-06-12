import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Frame extends Component {
  render () {
    return (
      <div className='frame'>
        <section className='contianer'>
          {this.props.children}
        </section>
      </div>
    )
  }
}

Frame.propTypes = {
  children: PropTypes.node
}

export default Frame
