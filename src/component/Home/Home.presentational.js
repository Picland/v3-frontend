import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
// import { NavLink } from 'react-router-dom'
import Header from '../../layout/Header/Header.connected'
import Footer from '../../layout/Footer/Footer.presentational'
import styles from './index.less'

@CSSModules(styles)
class Home extends Component {
  render () {
    let { userInfo } = this.props
    let avatarSrc = userInfo ? userInfo.avatar : ''
    return (
      <div styleName="container">
        <Header buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} />
        <div>
          <div styleName="main">
            <h2>目前已有功能</h2>
            <ul>
              <li>各个按钮的路由跳转和权限控制</li>
              <li>用户可以登录注册</li>
              <li>用户可以修改个人资料和密码</li>
              <li>用户可以退出登录</li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

Home.propTypes = {
  userInfo: PropTypes.object
}

export default Home
