import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  FeedContainer, LogoutContainer, UserContainer, PostDetailsContainer } from 'containers'

export default function getRoutes (checkAuth) {
  return (
    <Router>
      <MainContainer>
        <Switch>
          <Route exact={true} path='/' component={HomeContainer} onEnter={checkAuth} />
          <Route path='/auth' component={AuthenticateContainer} onEnter={checkAuth} />
          <Route path='/feed' component={FeedContainer} onEnter={checkAuth} />
          <Route path='/logout' component={LogoutContainer} onEnter={checkAuth} />
          <Route path='/post-detail/:postId' component={PostDetailsContainer} onEnter={checkAuth} />
          <Route path='/:uid' component={UserContainer} onEnter={checkAuth} />
          <Redirect to='/' />
        </Switch>
      </MainContainer>
    </Router>
  )
}

//
//

//
