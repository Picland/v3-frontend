import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../common/lib/fetch'
import { logout as logoutFromReducer } from '../reducer/user'

const mapStateToProps = (state) => (state.user)

const mapDispatchToProps = (dispatch) => ({
  logout: async (user) => {
    try {
      let result = await logout(user)
      result.code === 0 && dispatch(logoutFromReducer())
      if (result.code === -2) throw new Error('登出失败！')
    } catch (e) {
      console.error(e)
    }
  }
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
