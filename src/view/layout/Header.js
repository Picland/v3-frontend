import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Avatar from '../common/ui/Avatar/Avatar'
import Button from '../common/ui/Button/Button'
import styles from './Header.less'
// import { Menu, Dropdown } from 'antd'
//
// const menu = (
//   <Menu>
//     <Menu.Item>
//       <Link to="/people/test"><li>我的主页</li></Link>
//     </Menu.Item>
//     <Menu.Item>
//       <Link to="/settings/preview"><li>设置</li></Link>
//     </Menu.Item>
//     <Menu.Item>
//       <Link to="/logout"><li>退出</li></Link>
//     </Menu.Item>
//   </Menu>
// )

const mapStateToProps = (state) => ({
  avatarHover: state.header.avatarHover
})

@connect(mapStateToProps)
@CSSModules(styles)
class Header extends Component {
  static propTypes = {
    logoName: PropTypes.string,
    buttonName: PropTypes.string,
    buttonLink: PropTypes.string,
    avatarSrc: PropTypes.string,
    shadow: PropTypes.bool
  }
  static defaultProps = {
    logoName: '',
    buttonName: '',
    buttonLink: '/',
    shadow: false
  }

  constructor (props) {
    super(props)
    this.state = { chosen: null }
  }

  onChange (index) {
    this.setState({ chosen: index })
  }

  render () {
    let {logoName, buttonName, buttonLink, avatarSrc, shadow} = this.props
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
          { avatarSrc &&
            <div styleName="dropdown-wrapper">
              <Avatar shape="circle"
                      size="default"
                      src={avatarSrc}
                      styleName="avatar"
              />
              <ul styleName="dropdown-container">
                <Link to="/test"><li>我的主页</li></Link>
                <Link to="/settings/profile"><li>设置</li></Link>
                <Link to="/logout"><li>退出</li></Link>
              </ul>
            </div>
          }
          <Link to={buttonLink}><Button styleType="ghost">{buttonName}</Button></Link>
        </div>
      </header>
    )
  }
}

export default Header
