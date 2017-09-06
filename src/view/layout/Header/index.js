import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Avatar from '../../common/ui/Avatar/index'
import Button from '../../common/ui/Button/index'
import { Modal, ModalHeader, ModalBody } from '../../common/ui/Modal/'
import styles from './index.less'
import Login from '../../component/Login/'
import Register from '../../component/Register/'
import { login, register, updateUserInfo } from '../../common/service/fetch'
import { showFlashMessage } from '../../reducer/flashMessage'
import {
  startLogin,
  finishLogin,
  failLogin,
  loginSuccess,
  loginFail,
  startRegister,
  finishRegister,
  registerSuccess,
  failRegister,
  registerFail,
  update,
  updateAvatar
} from '../../reducer/user'

const mapStateToProps = (state) => ({
  // avatarHover: state.header.avatarHover,
  user: state.user.message,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  login: async (user) => {
    dispatch(startLogin())
    // let loading = document.getElementById('loading');
    // loading.style.display="block";
    try {
      let result = await login(user)
      if (result.code === 1) {
        dispatch(finishLogin(result.user))
        dispatch(showFlashMessage(loginSuccess(result.message)))
      } else {
        dispatch(failLogin(result.message))
        dispatch(showFlashMessage(loginFail(result.message)))
      }
    } catch (e) {
      console.error(e)
    }
  },
  register: async (user) => {
    dispatch(startRegister())
    // let loading = document.getElementById('loading');
    // loading.style.display="block";
    try {
      let result = await register(user)
      if (result.code === 1) {
        dispatch(finishRegister(result.user))
        dispatch(showFlashMessage(registerSuccess(result.message)))
      } else {
        dispatch(failRegister(result.message))
        dispatch(showFlashMessage(registerFail(result.message)))
      }
    } catch (e) {
      console.error(e)
    }
  },
  update: async (formData) => {
    try {
      let result = await updateUserInfo(formData)
      result && dispatch(update(result))
    } catch (e) {
      console.error(e)
    }
  },
  updateAfterUpload: (data) => {
    data && dispatch(updateAvatar(data))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Header extends PureComponent {
  static propTypes = {
    logoName: PropTypes.string,
    buttonName: PropTypes.string,
    buttonLink: PropTypes.string,
    avatarSrc: PropTypes.string,
    shadow: PropTypes.bool,
    user: PropTypes.object,
    flashMessage: PropTypes.object,
    login: PropTypes.func,
    register: PropTypes.func,
    update: PropTypes.func,
    updateAfterUpload: PropTypes.func
  }
  static defaultProps = {
    logoName: '',
    buttonName: '',
    buttonLink: '/',
    shadow: false,
    loginModal: true
  }

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
    let {logoName, buttonName, buttonLink, avatarSrc, shadow} = this.props
    const container = classNames({
      'container-unlogin': !shadow,
      'container-login': shadow
    })
    return (
      <header styleName={container}>
        <div>
          <div styleName="left">
            <span styleName="logo">{logoName}</span>
            <Link to="/"><li>首页</li></Link>
            <Link to="/"><li>旧版</li></Link>
          </div>
          { avatarSrc
          ? <div styleName="right">
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
            <Link to={buttonLink}><Button styleType="ghost">{buttonName}</Button></Link>
          </div>
            : <div styleName="right">
              <div styleName="nav-btn" onClick={() => this._handleModal('login')}>登录</div>
              <Button styleType="primary-wide" onClick={() => this._handleModal('register')}>{buttonName}</Button>
              <Modal ref="modal" lock>
                <ModalHeader />
                <ModalBody>
                  {this.state.loginModal
                    ? <Login
                      flashMessage={this.props.flashMessage}
                      login={this.props.login}
                      modal={this.ref}
                      switchModal={::this._switchModal}
                    />
                    : <Register
                      user={this.props.user}
                      flashMessage={this.props.flashMessage}
                      register={this.props.register}
                      update={this.props.update}
                      switchModal={::this._switchModal}
                      updateAfterUpload={::this.props.updateAfterUpload}
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

export default Header
