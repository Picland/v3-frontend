import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import _ from 'lodash'
import styles from './index.less'

@CSSModules(styles)
class WelcomeSection extends PureComponent {
  render () {
    const photo = [
      {tag: '风光', cover: 'scenery'},
      {tag: '人像', cover: 'portrait'},
      {tag: '城市', cover: 'city'},
      {tag: '旅行', cover: 'travel'},
      {tag: '街拍', cover: 'street'},
      {tag: '人文', cover: 'humanity'},
      {tag: '建筑', cover: 'architecture'},
      {tag: '静物', cover: 'still'},
      {tag: '私房', cover: 'private'},
      {tag: '校园', cover: 'school'}
    ]
    const author = [
      'J4M35',
      '谢松汕-桂林大河',
      '张宇卿',
      'Sean_T'
    ]
    const bgNo = _.random(0, 3)
    let bgUrl = `url(/img/common/login_bg${bgNo}.jpg)`
    return (
      <div>
        <section styleName="section1" style={{backgroundImage: bgUrl}}>
          <div styleName="author">By: @{author[bgNo]}</div>
        </section>
        <section styleName="section2">
          <h2>我们有梦， 关于摄影， 关于爱情， 关于穿越世界的旅行</h2>
          <p>在这里，发现基于共同兴趣的同好；鼓励原创和分享精神；除了美好的摄影和技能，我们更在意影像背后价值观的认同</p>
        </section>
        <section styleName="section3">
          <h2>摄影</h2>
          <div styleName="photo">
            <ul>
              {photo.map((v, i) =>
                <li key={i}>
                  <img src={`/img/common/c_${v.cover}.jpg`} alt="" width={176} height={176} />
                  <span styleName="tag-title">{v.tag}</span>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default WelcomeSection
