import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import Button from '../component/Button/Button'
import styles from './Header.less'

class Nav extends Component {
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
      <nav>
        <div styleName='left'>
          <span styleName='logo'>{logoName}</span>
        </div>
        <div styleName='right'>
          <Link to={buttonLink}><Button styleType='ghost'>{buttonName}</Button></Link>
        </div>
      </nav>
    )
  }
}

export default CSSModules(Nav, styles)
