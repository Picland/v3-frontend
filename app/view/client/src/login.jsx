import React from 'react'
import ReactDOM from 'react-dom'
import App from './page/Login/Login'

const render = (Component) => {
  ReactDOM.render(<App />,
    document.getElementById('app')
  )
}

render(App)

// 模块热替换的 API
if (module.hot) {
  // console.log('模块热替换')
  // module.hot.accept('./../app/demo/demo', () => {
  //   render(App)
  // })
}
