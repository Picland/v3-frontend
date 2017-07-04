import React from 'react'
import PreviewItem from './PreviewItem'
import PropTypes from 'prop-types'

class PreviewList extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    articleList: PropTypes.arrayOf(PropTypes.object),
    loadArticles: PropTypes.func,
    push: PropTypes.func
  };

  componentDidMount () {
    this.props.loadArticles()
  }

  render () {
    const { loading, error, articleList } = this.props

    if (error) {
      return <p className="message">Oops, something is wrong.</p>
    }

    if (loading) {
      return <p className="message">Loading...</p>
    }

    return (
      <div>
        {articleList.map(item => {
          return <PreviewItem {...item} key={item.id} push={this.props.push} />
        })}
      </div>
    )
  }
}

export default PreviewList
