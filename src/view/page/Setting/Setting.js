import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Header from '../../layout/Header'
import styles from './Setting.less'

class Setting extends Component {
  render () {
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/login" buttonName="发布" />
        <div styleName="main">{this.props.children}</div>
      </div>
    )
  }
}

Setting.propTypes = {
  children: PropTypes.node
}

export default CSSModules(Setting, styles)
