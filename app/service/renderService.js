import React from 'react'
import { StaticRouter } from 'react-router'
import render from '../view/server/serverRender'

export default (url, ctx = {}) =>
  render(
    <StaticRouter context={ctx} location={url} />
  )
