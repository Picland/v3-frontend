import React, { Component } from 'react'
import propTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import Header from '../../layout/Header'
import styles from './Setting.less'

const mapStateToProps = (state) => ({
  user: state.user.user
})

@connect(mapStateToProps)
@CSSModules(styles)
class Setting extends Component {
  static propTypes = {
    user: propTypes.object,
    children: propTypes.node
  }
  render () {
    let { user } = this.props
    let avatarSrc = user ? user.avatar : ''
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/login" buttonName="发布" avatarSrc={avatarSrc} shadow />
        <div styleName="main">{this.props.children}</div>
      </div>
    )
  }
}

export default Setting
