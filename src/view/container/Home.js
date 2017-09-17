import Home from '../component/Home'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Home)
