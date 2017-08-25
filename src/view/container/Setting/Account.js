import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Account from '../../component/Account'
import { update } from '../../reducer/user'
import { updateUserInfo } from '../../common/service/fetch'

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
  update: async (formData) => {
    try {
      let result = await updateUserInfo(formData)
      console.log('result', result)
      result && dispatch(update(result))
    } catch (e) {
      console.error(e)
    }
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account))
