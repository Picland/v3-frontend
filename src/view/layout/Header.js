import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import Button from '../component/Button/Button'
import styles from './Header.less'

class Nav extends Component {
  static defaultProps = {
    logoName: '',
    buttonName: '',
    buttonLink: '/'
  }

  render () {
    let {logoName, buttonName, buttonLink} = this.props
    return (
      <nav styleName="contianer">
        <div styleName="left">
          <span styleName="logo">{logoName}</span>
        </div>
        <div styleName="right">
          <Link to={buttonLink}><Button styleType="ghost">{buttonName}</Button></Link>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  logoName: PropTypes.string,
  buttonName: PropTypes.string,
  buttonLink: PropTypes.string
}

export default CSSModules(Nav, styles)
