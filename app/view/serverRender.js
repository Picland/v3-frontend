import { renderToString } from 'react-dom/server'
export default (renderMe) => {
  console.log('renderMe===', renderMe)
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>木纹子印象派</title>
    <link rel="stylesheet" href="http://localhost:3001/dist/css/app.css">
  </head>
  <body>
    <div id="app">${renderToString(renderMe)}</div>
    <script src="http://localhost:3001/dist/js/vendor.js"></script>
    <script src="http://localhost:3001/dist/js/app.js"></script>
  </body>
</html>`
}
