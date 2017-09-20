import User from '../component/User'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(User)
