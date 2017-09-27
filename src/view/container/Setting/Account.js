import { connect } from 'react-redux'
import Account from '../../component/Account'
import { update as updateAction } from '../../redux/action/user'
import { removeFlashMessage as removeFlashMessageAction } from '../../redux/action/flashMessage'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: info => dispatch(updateAction(info)),
  removeFlashMessage: data => dispatch(removeFlashMessageAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
