import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadArticles } from '../../reducer/preview'
import PreviewList from '../../component/Preview/PreviewList'

const mapStateToProps = (state) => ({
  articleList: state.preview.articleList
})

const mapDispatchToProps = ({
  loadArticles,
  push
})

// connect 方法让组件从redux的状态树中获取数据
@connect(mapStateToProps, mapDispatchToProps)
class Preview extends React.Component {
  render () {
    return (
      <div>
        <h1>Preview</h1>
        <PreviewList {...this.props} />
      </div>
    )
  }
}

export default Preview
