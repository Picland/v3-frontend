import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Account from '../../component/Account'
import { update, updateFail, updateSuccess } from '../../reducer/user'
import { showFlashMessage } from '../../reducer/flashMessage'
import { updateUserInfo } from '../../common/service/fetch'

const mapStateToProps = (state) => ({
  user: state.user.user,
  flashMessage: state.flashMessage
})

const mapDispatchToProps = (dispatch) => ({
  update: async (formData) => {
    try {
      let result = await updateUserInfo(formData)
      if (result.code === -1) {
        dispatch(showFlashMessage(updateFail(result.message)))
      } else {
        dispatch(update(result))
        dispatch(showFlashMessage(updateSuccess()))
      }
    } catch (e) {
      console.error(e)
    }
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))
