import { connect } from 'react-redux'
import Setting from '../../component/Setting'

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo
})

export default connect(mapStateToProps)(Setting)
