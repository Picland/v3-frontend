import { connect } from 'react-redux'
import Profile from './Profile.presentational'
import {
  update as updateAction,
  updateAvatarLogined as updateAvatarLoginedAction
} from '../../redux/action/user.action'
import { removeFlashMessage as removeFlashMessageAction } from '../../redux/action/flashMessage.action'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: data => dispatch(updateAction(data)),
  updateAvatarLogined: result => dispatch(updateAvatarLoginedAction(result)),
  removeFlashMessage: data => dispatch(removeFlashMessageAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
