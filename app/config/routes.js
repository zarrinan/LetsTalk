import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import MainContainer from '../containers/main/MainContainer'

const routes = (
  <Router>
    <Route path='/' component={MainContainer} />
  </Router>
)

export default routes
