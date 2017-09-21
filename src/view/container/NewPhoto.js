import NewPhoto from '../component/NewPhoto'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(NewPhoto)
