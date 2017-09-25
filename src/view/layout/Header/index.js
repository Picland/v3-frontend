import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Avatar from '_common_ui/Avatar'
import Button from '_common_ui/Button'
import { Modal, ModalHeader, ModalBody } from '_common_ui/Modal'
import styles from './index.less'
import Login from '../../component/Login/'
import Register from '../../component/Register/'
import { login as loginAction } from '../../redux/action/login'
import { register as registerAction } from '../../redux/action/register'
import {
  update as updateAction,
  updateAvatarUnlogined as updateAvatarUnloginedAction
} from '../../redux/action/user'

const mapStateToProps = (state) => ({
  otherInfo: state.user.otherInfo,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  login: async (user) => dispatch(loginAction(user)),
  register: async (user) => dispatch(registerAction(user)),
  update: async (info) => dispatch(updateAction(info)),
  updateAvatarUnlogined: (data) => dispatch(updateAvatarUnloginedAction(data))
})

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Header extends PureComponent {
  static propTypes = {
    logoName: PropTypes.string,
    buttonName: PropTypes.string,
    // buttonLink: PropTypes.string,
    avatarSrc: PropTypes.string,
    shadow: PropTypes.bool,
    otherInfo: PropTypes.object,
    flashMessage: PropTypes.object,
    login: PropTypes.func,
    register: PropTypes.func,
    update: PropTypes.func,
    updateAvatarUnlogined: PropTypes.func
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
    // {buttonLink}
    let {logoName, buttonName, avatarSrc, shadow} = this.props
    const container = classNames({
      'container-unlogin': !shadow,
      'container-login': shadow
    })
    return (
      <header styleName={container}>
        <div>
          <div styleName="left">
            <span styleName="logo">{logoName}</span>
            <Link to="/home"><li>首页</li></Link>
            <a href="http://muwenzi.com"><li>旧版</li></a>
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
                <Link to="/user"><li>我的主页</li></Link>
                <Link to="/settings/profile"><li>设置</li></Link>
                <Link to="/logout"><li>退出</li></Link>
              </ul>
            </div>
            {/* <Link to={buttonLink}><Button styleType="ghost">{buttonName}</Button></Link> */}
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

export default Header
