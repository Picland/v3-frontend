import { renderToString } from 'react-dom/server'

const NODE_ENV = process.env.NODE_ENV
const port = (+process.env.PORT) + 1

const dist = NODE_ENV === 'development'
  ? `http://localhost:${port}/dist`
  : '/dist'

export default (renderMe) => {
  console.log('renderMe===', renderMe)
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>木纹子印象派</title>
    <link rel="stylesheet" href="${dist}/css/app.css">
  </head>
  <body>
    <div id="root">${renderToString(renderMe)}</div>
    <script src="${dist}/js/vendor.js"></script>
    <script src="${dist}/js/app.js"></script>
  </body>
</html>`
}
