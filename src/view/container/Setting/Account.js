import { connect } from 'react-redux'
import Account from '../../component/Account'
import { update as updateAction } from '../../redux/action/user'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: async (info) => dispatch(updateAction(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
