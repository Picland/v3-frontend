import React from 'react'
import PropTypes from 'prop-types'
// import autobind from 'autobind-decorator'
import CSSModules from 'react-css-modules'
import styles from './PreviewItem.less'

// @autobind
@CSSModules(styles)
class PreviewItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    push: PropTypes.func,
    id: PropTypes.number,
    date: PropTypes.string,
    description: PropTypes.string
  };

  handleNavigate (id, e) {
    // 阻止原生链接跳转
    e.preventDefault()

    // 使用 react-router-redux 提供的方法跳转，以便更新对应的 store
    this.props.push(`detail/${id}`)
  }

  render () {
    return (
      <article styleName="article-preview-item">
        <h1>
          <a href={`detail/${this.props.id}`} onClick={this.handleNavigate.bind(this, this.props.id)}>
            {this.props.title}
          </a>
        </h1>
        <span>{this.props.date}</span>
        <p>{this.props.description}</p>
      </article>
    )
  }
}

export default PreviewItem
