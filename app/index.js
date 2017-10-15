import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
// since we imported 'thunk' and other middleware, we need to tell redux to use it
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// this middleware allows to return a function from an action creator, which will be applied to the thing we get from an action before it reaches the reducer
import thunk from 'redux-thunk'
import { checkIfAuthed } from 'helpers/auth'
import * as reducers from 'redux/modules'

// creating a single state tree, made up of reducers' initial values
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  // connecting to window dev tools, here to chrome redux extension
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

function checkAuth (nextState, replace) {
  if (store.getState().users.isFetching === true) {
    return
  }
  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  // integrating store with React, so that any component can grab information from the store (specify which part it needs from the store). Now, instead of rendering a specific React component, it renders Provider and pass it the store as an attribute
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
