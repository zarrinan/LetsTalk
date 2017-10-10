import { fetchUsersPosts } from 'helpers/api'
import { addMultiplePosts } from 'redux/modules/posts'

const FETCHING_USERS_POSTS = 'FETCHING_USERS_POSTS'
const FETCHING_USERS_POSTS_ERROR = 'FETCHING_USERS_POSTS_ERROR'
const FETCHING_USERS_POSTS_SUCCESS = 'FETCHING_USERS_POSTS_SUCCESS'
const ADD_SINGLE_USERS_POST = 'ADD_SINGLE_USERS_POST'

function fetchingUsersPosts (uid) {
  return {
    type: FETCHING_USERS_POSTS,
    uid,
  }
}

function fetchingUsersPostsError (error) {
  console.warn(error)
  return {
    type: FETCHING_USERS_POSTS_ERROR,
    error: 'Error fetching users post Ids',
  }
}

function fetchingUsersPostsSuccess (uid, postIds, lastUpdated) {
  return {
    type: FETCHING_USERS_POSTS_SUCCESS,
    uid,
    postIds,
    lastUpdated,
  }
}

export function addSingleUsersPost (uid, postIds) {
  return {
    type: ADD_SINGLE_USERS_POST,
    uid,
    postIds,
  }
}

export function fetchAndHandleUsersPosts (uid) {
  return function (dispatch) {
    dispatch(fetchingUsersPosts())
    fetchUsersPosts(uid)
      .then((posts) => dispatch(addMultiplePosts(posts)))
      .then(({posts}) => dispatch(
        fetchingUsersPostsSuccess(
          uid,
          Object.keys(posts).sort((a, b) => posts[b].timestamp - posts[a].timestamp),
          Date.now()
        )
      ))
      .catch((error) => dispatch(fetchingUsersPostsError(error)))
  }
}

const initialUsersPostState = {
  lastUpdated: 0,
  postIds: [],
}

function usersPost (state = initialUsersPostState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_POST :
      return {
        ...state,
        postIds: state.postIds.concat([action.postId]),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function usersPosts (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_POSTS :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USERS_POSTS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USERS_POSTS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          postIds: action.postIds,
        },
      }
    case ADD_SINGLE_USERS_POST :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersPost(state[action.uid], action),
        }
    default :
      return state
  }
}
