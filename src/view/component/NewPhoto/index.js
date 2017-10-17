import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import update from 'react-update'
import { Sticky, StickyContainer } from 'react-sticky'
import Button from '_common_ui/Button/'
import { Form, FormItem, FormInput, FormSelect, FormTextarea, Option } from '_common_ui/Form'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer/'
import styles from './index.less'

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
          <div styleName="form">
            <Form data={formData}
                  onSubmit={::this.handleSubmit}
                  onChange={formData => this.update('set', { formData })}>
              <div styleName="left">
                <FormItem label="作品描述" name="discription">
                  <FormTextarea placeholder="说说你的拍摄经历..." minWidth={400} minHeight={100} />
                </FormItem>
                <FormItem label="版权" name="gender" required>
                  <FormSelect minWidth={400}>
                    <Option value="m">男</Option>
                    <Option value="f">女</Option>
                    <Option value="x">不详</Option>
                  </FormSelect>
                </FormItem>
              </div>
              <div styleName="right">
                <div>
                  <FormItem label="镜头" name="gender" styleName="row">
                    <FormSelect minWidth={210}>
                      <Option value="m">男</Option>
                      <Option value="f">女</Option>
                      <Option value="x">不详</Option>
                    </FormSelect>
                  </FormItem>
                  <FormItem label="相机" name="gender" styleName="row">
                    <FormSelect minWidth={210}>
                      <Option value="m">男</Option>
                      <Option value="f">女</Option>
                      <Option value="x">不详</Option>
                    </FormSelect>
                  </FormItem>
                </div>
                <FormItem label="标签" name="bio">
                  <FormInput size="lg" width={442} />
                </FormItem>
              </div>
              {/* <FormSubmit size="lg" >保存</FormSubmit> */}
            </Form>
          </div>
          <Footer />
        </StickyContainer>
      </div>
    )
  }
}

NewPhoto.propTypes = {
  userInfo: PropTypes.object,
  update: PropTypes.func
}

export default NewPhoto
