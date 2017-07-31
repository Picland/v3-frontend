import React from 'react'
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
class Account extends React.Component {
  render () {
    return (
      <div>
        <h1>Account</h1>
      </div>
    )
  }
}

export default Account
