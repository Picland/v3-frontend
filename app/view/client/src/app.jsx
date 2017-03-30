import ReactDOM from 'react-dom'
import frontendRouter from './router'

const render = () => {
  ReactDOM.render(frontendRouter,
    document.getElementById('app')
  )
}

render()

// --------------------------------------
// React Moudle/Page Replacement for Dev
// --------------------------------------
if (module.hot) {
  console.info('React Moudle/Page Replacement for Dev')
  module.hot.accept('./page/Demo/Demo', () => {
    render()
  })
  module.hot.accept('./page/Register/Register', () => {
    render()
  })
}
