import User from '../component/User'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(User)
