import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import Button from '../common/ui/Button/Button'
import styles from './Header.less'

@CSSModules(styles)
class Header extends Component {
  static propTypes = {
    logoName: PropTypes.string,
    buttonName: PropTypes.string,
    buttonLink: PropTypes.string,
    shadow: PropTypes.bool
  }
  static defaultProps = {
    logoName: '',
    buttonName: '',
    buttonLink: '/',
    shadow: false
  }

  render () {
    let {logoName, buttonName, buttonLink, shadow} = this.props
    const container = classNames({
      'container-base': !shadow,
      'container-shadow': shadow
    })
    return (
      <header styleName={container}>
        <div styleName="left">
          <span styleName="logo">{logoName}</span>
        </div>
        <div styleName="right">
          <Link to={buttonLink}><Button styleType="ghost">{buttonName}</Button></Link>
        </div>
      </header>
    )
  }
}

export default Header
