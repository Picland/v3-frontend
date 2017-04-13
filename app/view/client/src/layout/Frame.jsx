import React, { Component } from 'react'
import Header from './Header'

class Frame extends Component {
  render () {
    return (
      <div className='frame'>
        <section className='header'>
          <Header logoName='木纹子印象派' buttonLink='/register' buttonName='注册' />
        </section>
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
