import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import update from 'react-update'
// import Button from '_common_ui/Button/'
import { Form, FormItem, FormInput, FormSelect, FormSubmit, FormTextarea, Option } from '_common_ui/Form'
import Header from '../../layout/Header/Header.container'
import styles from './NewPhoto.less'

@CSSModules(styles)
class NewPhoto extends Component {
  constructor (props) {
    super(props)
    this.update = update.bind(this)
    this.state = {
      formData: {
        name: this.props.userInfo.name,
        gender: this.props.userInfo.gender,
        bio: this.props.userInfo.bio
      }
    }
  }
  handleSubmit (data) {
    this.props.update(data)
  }
  render () {
    let { formData } = this.state
    let { userInfo } = this.props
    let avatarSrc = userInfo ? userInfo.avatar : ''
    return (
      <div styleName="container">
        <Header buttonLink="/newphoto" buttonName="发布" avatarSrc={avatarSrc} />
        <div styleName="box">
          <div styleName="main">
            <div styleName="import-from-album">从相册导入</div>
            <div styleName="upload">
              <h2>正在开发中...</h2>
            </div>
            <div styleName="description">
              <textarea name="description" styleName="img-description" placeholder="(8/10) 添加此图描述..." />
            </div>
          </div>
          <div styleName="right">
            <Form data={formData}
              onSubmit={::this.handleSubmit}
              onChange={formData => this.update('set', { formData })}
            >
              <FormItem label="发布在" name="gender">
                <FormSelect width={300}>
                  <Option value="f">我的主页</Option>
                </FormSelect>
              </FormItem>
              <FormItem label="同时添加到相册" name="gender" style={{position: 'relative'}}>
                <FormSelect width={190}>
                  <Option value="f">未分类相册</Option>
                </FormSelect>
                <div styleName="new-album">新建相册</div>
              </FormItem>
              <FormItem label="标题" name="bio">
                <FormInput width={300} />
              </FormItem>
              <FormItem label="作品描述" name="discription">
                <FormTextarea placeholder="说说你的拍摄经历..." minWidth={300} minHeight={100} />
              </FormItem>
              <FormItem label="标签" name="bio" style={{position: 'relative'}}>
                <div styleName="tags-wrap">
                  <a styleName="tag-item">的</a>
                  <a styleName="tag-item">风光</a>
                  <a styleName="tag-item">色彩</a>
                  <a styleName="tag-item">街拍</a>
                  <a styleName="tag-item">手机</a>
                  <a styleName="tag-item">城市</a>
                  <a styleName="tag-item">黑白</a>
                  <a styleName="tag-item">旅行</a>
                  <a styleName="tag-item">纪实</a>
                  <input type="text" styleName="tag-input" />
                </div>
                <span styleName="tags-note">（输入标签内容回车即可添加标签）</span>
                <span styleName="tags-count">0/10</span>
              </FormItem>
              <div styleName="tag">
                <div styleName="title">常用标签</div>
                <div styleName="tags-recommend">
                  <a styleName="tag-item">人像</a>
                  <a styleName="tag-item">风光</a>
                  <a styleName="tag-item">街拍</a>
                </div>
              </div>
              <div styleName="tag">
                <div styleName="title">推荐标签</div>
                <div styleName="tags-recommend">
                  <a styleName="tag-item">人像</a>
                  <a styleName="tag-item">风光</a>
                  <a styleName="tag-item">街拍</a>
                  <a styleName="tag-item">城市</a>
                  <a styleName="tag-item">旅行</a>
                  <a styleName="tag-item">纪实</a>
                  <a styleName="tag-item">色彩</a>
                  <a styleName="tag-item">手机</a>
                  <a styleName="tag-item">黑白</a>
                  <a styleName="tag-item">胶片</a>
                  <a styleName="tag-item">抓拍</a>
                </div>
              </div>
              <FormItem label="版权" name="gender">
                <FormSelect width={300}>
                  <Option value="0">非原创</Option>
                  <Option value="m">原创,CC0协议共享(非署名)</Option>
                  <Option value="x">原创,CC协议共享(署名)</Option>
                  <Option value="1">原创,CC协议共享(署名-非商业性使用)</Option>
                  <Option value="2">原创,CC协议共享(署名-禁止演绎)</Option>
                  <Option value="3">原创,CC协议共享(署名-相同方式共享)</Option>
                  <Option value="4">原创,CC协议共享(署名-非商业性使用-禁止演绎)</Option>
                  <Option value="f">原创,CC协议共享(署名-非商业性使用-相同方式共享)</Option>
                </FormSelect>
              </FormItem>
              <FormSubmit styleName="publish">发布</FormSubmit>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

NewPhoto.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func
}

export default NewPhoto
