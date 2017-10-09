import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer } from 'containers'

export default function getRoutes (checkAuth) {
  return (
    <Router>
      <MainContainer>
        <Switch>
          <Route exact={true} path='/' component={HomeContainer} onEnter={checkAuth}  />
          <Route path='/auth' component={AuthenticateContainer} onEnter={checkAuth} />
          <Route path='/feed' component={FeedContainer} onEnter={checkAuth}  />
        </Switch>
      </MainContainer>
    </Router>
  )
}
