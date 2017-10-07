import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
// import { NavLink } from 'react-router-dom'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer/'
import styles from './index.less'

@CSSModules(styles)
class NewPhoto extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  }
  render () {
    let { userInfo } = this.props
    let avatarSrc = userInfo ? userInfo.avatar : ''
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} />
        <div>
          <div styleName="main">
            <h2>正在开发中...</h2>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default NewPhoto
