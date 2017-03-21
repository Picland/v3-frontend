import React from 'react'
import ReactDOM from 'react-dom'
import './login.less'

class App extends React.Component {
  render() {
    return (
      <div className="ui grid">
        <div className="four wide column"></div>
        <div className="eight wide column">
          <form className="ui form segment" method="post">
            <div className="field required">
              <label>用户名</label>
              <input placeholder="用户名" type="text" name="name" />
            </div>
            <div className="field required">
              <label>密码</label>
              <input placeholder="密码" type="password" name="password" />
            </div>
            <input type="submit" className="ui button fluid" value="登录" />
          </form>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById('app'))