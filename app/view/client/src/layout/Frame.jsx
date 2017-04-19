import React, { Component } from 'react'

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
  children: React.PropTypes.node
}

export default Frame
