import { connect } from 'react-redux'
import Profile from '../../component/Profile'
import {
  update as updateAction,
  updateAvatarLogined as updateAvatarLoginedAction
} from '../../redux/action/user'
import { removeFlashMessage as removeFlashMessageAction } from '../../redux/action/flashMessage'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: data => dispatch(updateAction(data)),
  updateAvatarLogined: data => dispatch(updateAvatarLoginedAction(data)),
  removeFlashMessage: data => dispatch(removeFlashMessageAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
