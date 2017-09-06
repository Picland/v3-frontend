import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from '../view/container/Logout'
import Setting from '../view/container/Setting/Setting'
import NoMatch from '../view/component/NoMatch/NoMatch'
import Frame from '../view/layout/Frame'
import Welcome from '../view/container/Welcome'
import Detail from '../view/container/Setting/Detail'
import Preview from '../view/container/Setting/Preview'
import Profile from '../view/container/Setting/Profile'
import Account from '../view/container/Setting/Account'

const TestScreen = () => (
  <h2>Welcome to React</h2>
)

// auth 处理需要登录的路由，包装/合成
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      return auth
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: { from: props.location }}} />
    }} />
  )
}

// User Setting
const UserSetting = ({ match }) => (
  <Route path={match.url} render={() =>
    <Setting>
      <Switch>
        <Profile path={`${match.url}/profile`} />
        <Account path={`${match.url}/account`} />
        <Preview path={`${match.url}/preview`} />
        <Detail path={`${match.url}/detail/:id`} />
      </Switch>
    </Setting>
  } />
)

const mapStateToProps = (state) => ({
  auth: state.user.user._id
})

// Handle the sever redirect and 404
const RedirectFromServer = ({match}) => {
  let url = window.location.search
  console.log(url.substring(1))
  return url.substring(1)
    ? <Redirect to={{pathname: url.substring(1), state: { from: '/' }}} />
    : <NoMatch />
}

@connect(mapStateToProps)
class App extends Component {
  static propTypes = {
    auth: PropTypes.string
  }
  componentDidMount () {
    const loading = document.getElementById('loading')
    loading.style.display = 'none'
  }
  render () {
    let auth = this.props.auth
    return (
      <Router>
        <Route path="/" render={() =>
          <Frame>
            <Switch>
              <Route exact path="/test" component={TestScreen} />
              <Route exact path="/" component={Welcome} />
              <Route path="/logout" component={Logout} />
              <PrivateRoute path="/settings" component={UserSetting} auth={auth} />
            </Switch>
          </Frame>
        } />
      </Router>
    )
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  auth: PropTypes.string,
  location: PropTypes.object
}

UserSetting.propTypes = {
  match: PropTypes.object
}

RedirectFromServer.propTypes = {
  match: PropTypes.object
}

export default App
