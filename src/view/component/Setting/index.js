import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { NavLink } from 'react-router-dom'
import { Sticky, StickyContainer } from 'react-sticky'
import Header from '../../layout/Header/index'
import Footer from '../../layout/Footer'
import styles from './index.less'

@CSSModules(styles)
class Setting extends Component {
  render () {
    let { userInfo } = this.props
    let avatarSrc = userInfo ? userInfo.avatar : ''
    return (
      <div styleName="container">
        <Header buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} nofixed />
        <StickyContainer>
          <Sticky>
            {
              ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight, styleName }) => {
                return <div className={styles.navTop} style={style}>
                  <NavLink to="/settings/profile" activeClassName={styles.active}><div className={styles.navMenu}>个人资料</div></NavLink>
                  <NavLink to="/settings/account" activeClassName={styles.active}><div className={styles.navMenu}>账号和密码</div></NavLink>
                </div>
              }
            }
          </Sticky>
          <div styleName="main">
            {this.props.children}
          </div>
          <Footer />
        </StickyContainer>
      </div>
    )
  }
}

Setting.propTypes = {
  userInfo: PropTypes.object,
  children: PropTypes.node
}

export default Setting
