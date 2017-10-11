import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Sticky, StickyContainer } from 'react-sticky'
import Button from '_common_ui/Button/'
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
        <Header buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} nofixed />
        <StickyContainer>
          <Sticky>
            {
              ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight, styleName }) => {
                return <div className={styles.navTop} style={style}>
                  <div className={styles.content}>
                    <div className={styles.left}>sss</div>
                    <div className={styles.right}>
                      <Button type="minor">保存</Button>
                      <Button>发布</Button>
                    </div>
                  </div>
                </div>
              }
            }
          </Sticky>
          <div styleName="upload">
            <h2>正在开发中...</h2>
          </div>
          <div styleName="form" />
          <Footer />
        </StickyContainer>
      </div>
    )
  }
}

export default NewPhoto
