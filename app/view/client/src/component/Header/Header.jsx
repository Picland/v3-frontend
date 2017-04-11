import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import Button from '../Button/Button'
import styles from './Header.less'

class Header extends Component {
  constructor (props) {
    super(props)
  }

  static defaultProps = {
    logoName: '',
    buttonName: '',
    buttonLink: '/'
  }

  render () {
    let {logoName, buttonName, buttonLink} = this.props
    return (
      <div styleName='contianer'>
        <div styleName='left'>
          <span styleName='logo'>{logoName}</span>
        </div>
        <div styleName='right'>
          <a href={buttonLink}><Button styleType='ghost'>{buttonName}</Button></a>
        </div>
      </div>
    )
  }
}

export default CSSModules(Header, styles)
