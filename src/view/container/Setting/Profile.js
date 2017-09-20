import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Profile from '../../component/Profile'
import {
  update as updateAction,
  updateAfterUpload as updateAfterUploadAction
} from '../../redux/action/user'

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  update: async (data) => dispatch(updateAction(data)),
  updateAfterUpload: (data) => dispatch(updateAfterUploadAction(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
