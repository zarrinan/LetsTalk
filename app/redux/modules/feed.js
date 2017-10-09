const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_POST_ID_TO_FEED = 'ADD_NEW_POST_ID_TO_FEED'
const RESET_NEW_POSTS_AVAILABLE = 'RESET_NEW_POSTS_AVAILABLE'

function settingFeedListener() {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError(error) {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

function settingFeedListenerSuccess(postIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    postIds,
  }
}

function addNewPostIdToFeed(postId) {
  return {
    type: ADD_NEW_POST_ID_TO_FEED,
    postId,
  }
}

function resetNewPostsAvailable() {
  return {
    type: RESET_NEW_POSTS_AVAILABLE,
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
