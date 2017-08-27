import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { NavLink } from 'react-router-dom'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer'
import styles from './index.less'

@CSSModules(styles)
class Setting extends Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node
  }
  render () {
    let { user } = this.props
    let avatarSrc = user ? user.avatar : ''
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/login" buttonName="发布" avatarSrc={avatarSrc} shadow />
        <div styleName="nav-top">
          <NavLink to="/settings/profile" activeClassName={styles.active}><div styleName="nav-menu">个人资料</div></NavLink>
          <NavLink to="/settings/account" activeClassName={styles.active}><div styleName="nav-menu">账号和密码</div></NavLink>
        </div>
        <div styleName="main">
          <div styleName="content">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Setting
