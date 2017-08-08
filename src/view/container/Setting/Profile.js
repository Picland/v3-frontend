import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Profile.less'
import InputForm from '../../common/ui/InputForm'
// import autobind from 'autobind-decorator'
// import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import { loadArticles } from '../../reducer/preview'

// const mapStateToProps = (state) => ({
//   articleList: state.preview.articleList
// })

// const mapDispatchToProps = ({
//   loadArticles,
//   push
// })

// connect 方法让组件从redux的状态树中获取数据
// @connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Profile extends React.Component {
  render () {
    return (
      <div styleName="container">
        <div styleName="title">个人资料</div>
        <InputForm label="昵称" content="Kimi Gao" />
      </div>
    )
  }
}

export default Profile
