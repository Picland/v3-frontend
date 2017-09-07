import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import _ from 'lodash'
import styles from './/index.less'

@CSSModules(styles)
class WelcomeSection extends PureComponent {
  render () {
    let photo = [
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
    let bgUrl = `url(/img/common/login_bg${_.random(1, 3)}.jpg)`
    return (
      <div>
        <section styleName="section1" style={{backgroundImage: bgUrl}} />
        <section styleName="section2">
          <h2>唯有生活和酒，是自己的</h2>
          <p>在这里，你可以基于共同的兴趣爱好，寻找志同道合的人。约上几个好友，一壶浊酒尽馀欢。</p>
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
