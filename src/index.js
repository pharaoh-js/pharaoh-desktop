import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import App from './app'
import createHistory from 'history/lib/createHashHistory'
import Landing from './landing'
import './styles.css'

export const CodeMirror = global.CodeMirror
export const Firebase = global.Firebase
export const Firepad = global.Firepad

const appHistory = createHistory({ queryKey: false })
const el = document.getElementById('root')

render((
  <Router history={appHistory}>
    <Route path="/app/:role/:project" component={App} />
    <Route path="/" component={Landing} />
  </Router>
), el)
