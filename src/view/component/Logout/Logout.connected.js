import { connect } from 'react-redux'
import logoutAction from '../../redux/action/logout.action'
import Logout from './Logout.presentational'

const mapStateToProps = state => (state.user)

const mapDispatchToProps = (dispatch) => ({
  logout: async () => dispatch(logoutAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
