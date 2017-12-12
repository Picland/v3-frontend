import Home from './Home.presentational'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  userInfo: state.user.userInfo
})

export default connect(mapStateToProps)(Home)
