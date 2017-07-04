import Login from '../component/Login/Login'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../common/service/fetch'
import redirect from '../common/service/redirect'
import { startLogin, finishLogin, failLogin, loginSuccess, loginFail } from '../reducer/user'
import { showFlashMessage } from '../reducer/flashMessage'

const mapStateToProps = (state) => (state.user)

const mapDispatchToProps = (dispatch) => ({
  loginIn: async (user) => {
    dispatch(startLogin())
    // let loading = document.getElementById('loading');
    // loading.style.display="block";
    try {
      let result = await login(user)
      if (result.code === 1) {
        dispatch(finishLogin(result.user))
        dispatch(showFlashMessage(loginSuccess()))
      } else {
        dispatch(failLogin(result.message))
        dispatch(showFlashMessage(loginFail(result.message)))
      }
    } catch (e) {
      console.error(e)
    }
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(redirect(Login)))
