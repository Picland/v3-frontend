import Login from '../component/Login/Login'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../common/service/fetch'
import { checkLoginRedirect } from '../common/service/redirect' // redirect is high-order component
import { startLogin, finishLogin, failLogin, loginSuccess, loginFail } from '../reducer/user'
import { showFlashMessage } from '../reducer/flashMessage'

const mapStateToProps = (state) => (state.user)

const mapDispatchToProps = (dispatch) => ({
  login: async (user) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(checkLoginRedirect(Login)))
