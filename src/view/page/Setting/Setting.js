import React, { Component } from 'react'
import propTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Header from '../../layout/Header'
import styles from './Setting.less'

@CSSModules(styles)
class Setting extends Component {
  static propTypes = {
    children: propTypes.node
  }
  render () {
    return (
      <div styleName="container">
        <Header logoName="木纹子印象派" buttonLink="/login" buttonName="发布" shadow />
        <div styleName="main">{this.props.children}</div>
      </div>
    )
  }
}

export default Setting
