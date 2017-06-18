// import React from 'react'
// import { StaticRouter as Router, Route } from 'react-router'
import render from '../view'

// import Frame from '../view/layout/Frame'
// import Login from '../view/page/Login/Login'
// import Register from '../view/page/Register/Register'

const NODE_ENV = process.env.NODE_ENV

export default (url, ctx = {}) => {
  if (NODE_ENV === 'development') {
    return render()
  }
  // else {
  //   return render(
  //     <Router context={ctx} location={url}>
  //       <div>
  //         <Route path='/' component={Frame} />
  //         <Route path='/login' component={Login} />
  //         <Route path='/register' component={Register} />
  //       </div>
  //     </Router>
  //   )
  // }
}
