import { addListener } from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/api'
import { addMultiplePosts } from 'redux/modules/posts'
import { fromJS, List } from 'immutable'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_POST_ID_TO_FEED = 'ADD_NEW_POST_ID_TO_FEED'
const RESET_NEW_POSTS_AVAILABLE = 'RESET_NEW_POSTS_AVAILABLE'

function settingFeedListener () {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError (error) {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

function settingFeedListenerSuccess (postIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    postIds,
  }
}

function addNewPostIdToFeed (postId) {
  return {
    type: ADD_NEW_POST_ID_TO_FEED,
    postId,
  }
}

export function resetNewPostsAvailable () {
  return {
    type: RESET_NEW_POSTS_AVAILABLE,
  }
}

export function setAndHandleFeedListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed === true) {
      return
    }

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultiplePosts(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewPostIdToFeed(sortedIds[0]))
      initialFetch = false
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

const initialState = {
  isFetching: false,
  newPostsAvailable: false,
  newPostsToAdd: [],
  error: '',
  postIds: [],
}

export default function feed (state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        postIds: action.postIds,
        newPostsAvailable: false,
      }
    case ADD_NEW_POST_ID_TO_FEED :
      return {
        ...state,
        newPostsToAdd: [action.postId, ...state.newPostsToAdd],
        newPostsAvailable: true,
      }
    case RESET_NEW_POSTS_AVAILABLE :
      return {
        ...state,
        postIds: [...state.newPostsToAdd, ...state.postIds],
        newPostsToAdd: [],
        newPostsAvailable: false,
      }
    default :
      return state
  }
}
