import React from 'react'
import ReactDOM from 'react-dom'
import App from './Register'

const render = (Component) => {
  ReactDOM.render(<App />,
    document.getElementById('app')
  )
}

render(App)

// 模块热替换的 API
if (module.hot) {
  console.log('模块热替换')
  module.hot.accept('./Register', () => {
    render(App)
  })
}
