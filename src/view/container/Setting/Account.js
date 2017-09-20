import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Account from '../../component/Account'
import { update as updateAction } from '../../redux/action/user'

const mapStateToProps = (state) => ({
  user: state.user.user,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: async (info) => dispatch(updateAction(info))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))
