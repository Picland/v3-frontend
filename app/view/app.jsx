import ReactDOM from 'react-dom'
import ViewRouter from './viewRouter'

const render = () => {
  ReactDOM.render(ViewRouter,
    document.getElementById('app')
  )
}

render()

// --------------------------------------
// React Moudle/Page Replacement for Dev
// --------------------------------------
if (module.hot) {
  console.info('React Moudle/Page Replacement for Dev')
  module.hot.accept('./page/Login/Login', () => {
    render()
  })
  module.hot.accept('./page/Register/Register', () => {
    render()
  })
  module.hot.accept('./layout/Header', () => {
    render()
  })
}
