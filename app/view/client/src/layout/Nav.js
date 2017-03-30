import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render () {
    return (
      <nav>
        <Link to='/'>登录</Link>
        <br />
        <Link to='/register'>注册</Link>
      </nav>
    )
  }
}

export default Nav
