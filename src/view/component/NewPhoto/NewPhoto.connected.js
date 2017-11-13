import NewPhoto from './NewPhoto.presentational'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo
  }
}

export default connect(mapStateToProps)(NewPhoto)
