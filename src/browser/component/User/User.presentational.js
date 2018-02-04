import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { NavLink, Link } from 'react-router-dom'
import { Sticky, StickyContainer } from 'react-sticky'
import Avatar from '_common_ui/Avatar'
import Gallery from '_common_ui/Gallery'
import Icon from '_common_ui/Icon'
import Header from '../../layout/Header/Header.container'
import Footer from '../../layout/Footer/Footer.presentational'
import styles from './User.less'

@CSSModules(styles)
class User extends Component {
    static propTypes = {
      userInfo: PropTypes.object,
      getUserInfo: PropTypes.func,
      match: PropTypes.object,
      logined: PropTypes.bool
    }
    constructor (props) {
      super(props)
      props.getUserInfo(props.match.params.userId)
    }
    render () {
      let { userInfo, logined } = this.props
      let avatarSrc = userInfo ? userInfo.avatar : ''
      const cards = new Array(16).fill('')
      const galleryOptions = {
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        transitionDuration: 0
      }
      return (
        <div styleName="container">
          { logined
            ? <Header buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} nofixed />
            : <Header buttonLink="/register" buttonName="注册" nofixed />
          }
          <div styleName="personal-banner" style={{backgroundImage: 'url(/img/common/personal_bg.jpg)'}}>
            <div styleName="personal-banner-info">
              <Avatar src={avatarSrc} title="更换头像" />
              <div styleName="personal-info">
                <div styleName="name">{userInfo.name}</div>
                <div styleName="follow-btn">关注</div>
                <div styleName="slash-list">
                  <span styleName="slash-item">陕西省-西安市-雁塔区</span>
                  <span styleName="slash-item">关注 94</span>
                  <span styleName="slash-item">粉丝 10656</span>
                </div>
                <div styleName="bio">{userInfo.bio}</div>
              </div>
              <div styleName="personal-act">
                <div styleName="message">
                  <Icon type="message" styleName="icon-message" />
                  <span>站内信</span>
                </div>
                <div styleName="act-more">
                  <div styleName="act-more-icon" />
                  <ul styleName="act-list">
                    <Link to="http://weibo.com/u/2003943065"><li>查看微博</li></Link>
                    <Link to="/settings/profile"><li>拉黑用户</li></Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <StickyContainer>
            <Sticky>
              {
                ({ isSticky, style }) => {
                  // console.log(isSticky)
                  return <div className={styles.navTop} style={style}>
                    <NavLink to="/user" activeClassName={styles.active}>
                      <div className={styles.navMenu}>图片墙</div>
                    </NavLink>
                    <NavLink to="/settings/account" activeClassName={styles.active}>
                      <div className={styles.navMenu}>相册</div>
                    </NavLink>
                    <NavLink to="/settings/account" activeClassName={styles.active}>
                      <div className={styles.navMenu}>喜欢</div>
                    </NavLink>
                    <NavLink to="/settings/account" activeClassName={styles.active}>
                      <div className={styles.navMenu}>活动</div>
                    </NavLink>
                    <NavLink to="/settings/account" activeClassName={styles.active}>
                      <div className={styles.navMenu}>收藏夹</div>
                    </NavLink>
                    <NavLink to="/settings/account" activeClassName={styles.active}>
                      <div className={styles.navMenu}>资料</div>
                    </NavLink>
                  </div>
                }
              }
            </Sticky>
            <div styleName="main">
              {/* { cards.map((card, index) => */}
              {/* <div key={index} styleName="card"> */}
              {/* <img src={`/img/test/${index + 1}.jpg`} alt="" /> */}
              {/* <div styleName="card-info"> */}
              {/* <span>喜欢</span> */}
              {/* <span>评论</span> */}
              {/* </div> */}
              {/* </div>) */}
              {/* } */}
              <Gallery options={galleryOptions} elements={cards} />
            </div>
            <Footer />
          </StickyContainer>
        </div>
      )
    }
}

export default User
