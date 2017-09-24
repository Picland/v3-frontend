import { connect } from 'react-redux'
import Profile from '../../component/Profile'
import {
  update as updateAction,
  updateAvatarLogined as updateAvatarLoginedAction
} from '../../redux/action/user'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: data => dispatch(updateAction(data)),
  updateAvatarLogined: data => dispatch(updateAvatarLoginedAction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
