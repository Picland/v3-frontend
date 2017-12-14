import User from './User.presentational'
import { connect } from 'react-redux'
import { getUserInfo } from '../../redux/action/user.action'

const mapStateToProps = (state) => ({
  logined: state.user.logined,
  userInfo: state.user.userInfo
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: userId => dispatch(getUserInfo(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
