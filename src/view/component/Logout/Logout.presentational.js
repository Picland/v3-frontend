import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  async _signOut () {
    await this.props.logout()
  }
  componentWillMount () {
    this._signOut()
  }
  render () {
    return (
      <Redirect to={{pathname: '/', state: { from: this.props.location }}} />
    )
  }
}

Logout.propTypes = {
  logout: PropTypes.func,
  location: PropTypes.object
}

export default Logout
