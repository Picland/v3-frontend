import React from 'react'
import { connect } from 'react-redux'
import PreviewList from '../component/Preview/PreviewList'
import { actions } from './PreviewRedux'
import { push } from 'react-router-redux'

@connect(state => {
  return {
    articleList: state.preview.list.articleList
  }
}, {
  push,
  ...actions
})
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
