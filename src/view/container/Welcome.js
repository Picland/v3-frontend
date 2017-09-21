import Welcome from '../component/Welcome'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { checkLoginRedirect } from '../common/util/redirect'

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo
  }
}

export default withRouter(connect(mapStateToProps)(checkLoginRedirect(Welcome)))
