import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainContainer from '../containers/main/MainContainer'


const routes = (
  <Router>
    <Route path='/' component={MainContainer} />
  </Router>
  )


export default routes;
