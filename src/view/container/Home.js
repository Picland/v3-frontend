import Home from '../component/Home'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  userInfo: state.user.userInfo
})

export default connect(mapStateToProps)(Home)
