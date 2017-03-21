import React from 'react'
import ReactDOM from 'react-dom'
import './demo.less'

class App extends React.Component {
  render() {
    return (
      <h2>This is demo!</h2>
    )
  }
}

ReactDOM.render(<App />,
  document.getElementById('app'))