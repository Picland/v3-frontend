import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import Avatar from '_common_ui/Avatar'
import Button from '_common_ui/Button'
import Icon from '_common_ui/Icon'
import { Modal, ModalHeader, ModalBody } from '_common_ui/Modal'
import Login from '../../component/Login/Login.presentational'
import Register from '../../component/Register/Register.presentational'
import styles from './Header.less'

@CSSModules(styles)
class Header extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { chosen: null }
  }

  onChange (index) {
    this.setState({ chosen: index })
  }

  _handleModal (modalName) {
    this.refs.modal.open()
    this.setState({ loginModal: modalName === 'login' })
  }

  _switchModal () {
    this.setState({ loginModal: !this.state.loginModal })
  }

  render () {
    let {buttonName, buttonLink, avatarSrc, nofixed, scroll, userId, logined} = this.props
    let container = nofixed && 'container-nofixed'
    container = container || (!avatarSrc && !scroll && 'container-unlogin-unscroll')
    container = container || (!avatarSrc && scroll && 'container-unlogin-scroll')
    container = container || 'container-base'
    return (
      <header styleName={container}>
        <div>
          <div styleName="left">
            <img styleName="logo" src="/img/common/logo.png" />
            <Link to="/home"><li>首页</li></Link>
            <a href="http://muwenzi.com"><li>旧版</li></a>
          </div>
          { logined
            ? <div styleName="right">
              <Icon type="message" styleName="icon-message" />
              <div styleName="dropdown-wrapper">
                <div styleName="avatar">
                  <Avatar shape="circle" size="default" src={avatarSrc} />
                </div>
                <ul styleName="dropdown-container">
                  <Link to={`/user/${userId}`}><li>我的主页</li></Link>
                  <Link to="/settings/profile"><li>设置</li></Link>
                  <Link to="/logout"><li>退出</li></Link>
                </ul>
              </div>
              <Link to={buttonLink}><Button size="sm" ghost>{buttonName}</Button></Link>
            </div>
            : <div styleName="right">
              <div styleName="nav-btn" onClick={() => this._handleModal('login')}>登录</div>
              <Button onClick={() => this._handleModal('register')}>{buttonName}</Button>
              <Modal ref="modal" lock>
                <ModalHeader />
                <ModalBody>
                  {this.state.loginModal
                    ? <Login
                      otherInfo={this.props.otherInfo}
                      flashMessage={this.props.flashMessage}
                      login={this.props.login}
                      switchModal={::this._switchModal}
                    />
                    : <Register
                      otherInfo={this.props.otherInfo}
                      flashMessage={this.props.flashMessage}
                      register={this.props.register}
                      update={this.props.update}
                      switchModal={::this._switchModal}
                      updateAvatarUnlogined={::this.props.updateAvatarUnlogined}
                    />
                  }
                </ModalBody>
              </Modal>
            </div>
          }
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  buttonName: PropTypes.string,
  buttonLink: PropTypes.string,
  avatarSrc: PropTypes.string,
  userId: PropTypes.string,
  nofixed: PropTypes.bool,
  scroll: PropTypes.bool,
  otherInfo: PropTypes.object,
  flashMessage: PropTypes.object,
  login: PropTypes.func,
  register: PropTypes.func,
  update: PropTypes.func,
  updateAvatarUnlogined: PropTypes.func,
  logined: PropTypes.bool
}

Header.defaultProps = {
  logoName: '',
  buttonName: '',
  buttonLink: '/',
  nofixed: false,
  loginModal: true
}

export default Header
