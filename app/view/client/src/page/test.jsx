import React from 'react'
import ReactDOM from 'react-dom'
import './test.less'

class App extends React.Component {
  render() {
    return (
      <h2>Hello Test!</h2>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById("app"))