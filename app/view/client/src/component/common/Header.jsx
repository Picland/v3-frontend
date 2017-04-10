import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Button from './Button'
import styles from './Header.less'

class Header extends Component {
  render () {
    return (
      <div styleName='contianer'>
        <div styleName='left'>
          <span styleName='logo'>木纹子印象派</span>
        </div>
        <div styleName='right'>
          <Button type='ghost'><a href='/register'>注册</a></Button>
        </div>
      </div>
    )
  }
}

export default CSSModules(Header, styles)
