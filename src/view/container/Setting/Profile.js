import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Profile from '../../component/Profile'
import { update } from '../../reducer/user'
import { updateUserInfo } from '../../common/service/fetch'

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  update: async (formData) => {
    try {
      let result = await updateUserInfo(formData)
      result && dispatch(update(result))
    } catch (e) {
      console.error(e)
    }
  },
  updateAfterUpload: (data) => {
    data && dispatch(update(data))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
