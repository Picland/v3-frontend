import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.less'

@CSSModules(styles)
class Footer extends Component {
  render () {
    return (
      <footer styleName="container">
        <div styleName="first-line">
          <div styleName="left">
            <label>关于我们</label>
            <div styleName="intro">这是一个关于摄影爱好者的网站<br />
              在这里，发现基于共同兴趣的同好，鼓励原创和分享精神<br />
              除了美好的摄影和技能，我们更在意影像背后价值观的认同</div>
          </div>
          <div styleName="left">
            <label>微信公众号</label>
            <div styleName="intro">
              <img src="/img/qrcode_footer.png" alt="" />
            </div>
          </div>
          <div styleName="right">
            <label>特别感谢</label>
            <div styleName="thanks">
              <div>摄影师羊驼</div>
              <div>Amélie/米粒</div>
              <div>张宇卿</div>
            </div>
          </div>
        </div>
        <div styleName="second-line">
          <div styleName="left">
            <span>©2015-2017 muwenzi.com 苏ICP备15056713号</span>
            <span>坐标：南京 / 杭州 / 苏州 / 上海</span>
          </div>
          <div styleName="right">
            <span>旧版首页</span>
            <span>环境人像</span>
            <span>私房写真</span>
            <span>风光人文</span>
            <span>拍摄活动</span>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
