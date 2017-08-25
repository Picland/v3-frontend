import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Setting from '../../component/Setting'

const mapStateToProps = (state) => ({
  user: state.user.user
})

export default withRouter(connect(mapStateToProps)(Setting))
