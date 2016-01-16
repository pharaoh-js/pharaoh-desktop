import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'
import Landing from './landing'
import './styles.css'

export const {
  CodeMirror,
  Firebase,
  Firepad
} = global

const el = document.getElementById('root')

render((
  <BrowserRouter>
    <Switch>
      <Route exactly pattern="/" component={Landing} />
      <Route exactly pattern="/app/:role/:project" component={App} />
      <Route component={Landing} />
    </Switch>
  </BrowserRouter>
), el)
