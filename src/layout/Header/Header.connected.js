import { connect } from 'react-redux'
import { login as loginAction } from '../../redux/action/login.action'
import { register as registerAction } from '../../redux/action/register.action'
import {
  update as updateAction,
  updateAvatarUnlogined as updateAvatarUnloginedAction
} from '../../redux/action/user.action'
import Header from './Header.presentational'

const mapStateToProps = (state) => ({
  otherInfo: state.user.otherInfo,
  userId: state.user.userInfo._id,
  logined: state.user.logined,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  login: async (user) => dispatch(loginAction(user)),
  register: async (user) => dispatch(registerAction(user)),
  update: async (info) => dispatch(updateAction(info)),
  updateAvatarUnlogined: (result) => dispatch(updateAvatarUnloginedAction(result))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
