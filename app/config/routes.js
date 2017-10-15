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

// onEnter prop is a callback function that gets invoked before a route is about to be entered. It receives a 'nextState (which is an object)' and a 'replace' arguments which help in getting the route we're going to as well as redirecting, if the user isn't authed. nextState allows us to get the pathname of the route we're about to be taken to, replace allows to perform a redirect
