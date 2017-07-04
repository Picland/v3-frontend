import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../view/container/Login'
import Register from '../view/container/Register'
import Setting from '../view/container/Setting/Setting'
import NoMatch from '../view/component/NoMatch/NoMatch'
import Frame from '../view/layout/Frame'
import Detail from '../view/container/Setting/Detail'
import Preview from '../view/container/Setting/Preview'

const TestScreen = () => (
  <h2>Welcome to React</h2>
)

// auth 处理需要登录的路由，包装/合成
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      auth.user
        ? (<Component {...props} />)
        : (<Redirect to={{pathname: '/login', state: { from: props.location }}} />)
      )}
    />
  )
}

// User Setting
const UserSetting = ({ match }) => (
  <Route path={match.url} render={() =>
    <Setting>
      <Switch>
        <Preview path={`${match.url}/preview`} />
        <Detail path={`${match.url}/detail/:id`} />
      </Switch>
    </Setting>
  } />
)

const mapStateToProps = (state) => ({
  user: state.user
})
// 处理服务器重定向问题与404
const RedirectFromServer = ({match}) => {
  // deal the sever redirect
  let url = window.location.search
  console.log(url.substring(1))
  return url.substring(1)
    ? <Redirect to={{pathname: url.substring(1), state: { from: '/' }}} />
    : <NoMatch />
}

@connect(mapStateToProps)
class App extends Component {
  static propTypes = {
    user: PropTypes.object
  }
  componentDidMount () {
    const loading = document.getElementById('loading')
    loading.style.display = 'none'
  }
  render () {
    let auth = this.props.user
    return (
      <Router>
        <Route path="/" render={() =>
          <Frame>
            <Switch>
              <Route exact path="/test" component={TestScreen} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Login} />
              <Route path="/register" component={Register} />
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
  auth: PropTypes.object,
  location: PropTypes.func
}

UserSetting.propTypes = {
  match: PropTypes.object
}

RedirectFromServer.propTypes = {
  match: PropTypes.object
}

export default App
