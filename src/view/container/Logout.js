import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import logoutAction from '../redux/action/logout'

const mapStateToProps = state => (state.user)

const mapDispatchToProps = (dispatch) => ({
  logout: async () => dispatch(logoutAction())
})

@connect(mapStateToProps, mapDispatchToProps)
class Logout extends Component {
  static propTypes=({
    logout: PropTypes.func,
    location: PropTypes.object
  })
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

export default Logout
