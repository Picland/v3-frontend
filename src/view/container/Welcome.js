import Welcome from '../component/Welcome/'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { checkLoginRedirect } from '../common/service/redirect'

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default withRouter(connect(mapStateToProps)(checkLoginRedirect(Welcome)))
