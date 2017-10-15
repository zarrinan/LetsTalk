import { savePost, fetchPost } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersPost } from './usersPosts'

const FETCHING_POST = 'FETCHING_POST'
const FETCHING_POST_ERROR = 'FETCHING_POST_ERROR'
const FETCHING_POST_SUCCESS = 'FETCHING_POST_SUCCESS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_POST = 'ADD_POST'
const ADD_MULTIPLE_POSTS = 'ADD_MULTIPLE_POSTS'

export function fetchingPost () {
  return {
    type: FETCHING_POST,
  }
}

export function fetchingPostError (error) {
  console.warn(error)
  return {
    type: FETCHING_POST_ERROR,
    error: 'Error fetching post',
  }
}

function fetchingPostSuccess (post) {
  return {
    type: FETCHING_POST_SUCCESS,
    post,
  }
}

export function removeFetching () {
  return {
    type: REMOVE_FETCHING,
  }
}

function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function addMultiplePosts (posts) {
  return {
    type: ADD_MULTIPLE_POSTS,
    posts,
  }
}

export function postFanout (post) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    savePost(post)
      .then((postWithID) => {
        dispatch(addPost(postWithID))
        dispatch(closeModal())
        dispatch(addSingleUsersPost(uid, postWithID.postId))
      })
      .catch((err) => {
        console.warn('Error in postFanout', err)
      })
  }
}

export function fetchAndHandlePost (postId) {
  return function (dispatch) {
    dispatch(fetchingPost())
    fetchPost(postId)
      .then((post) => dispatch(fetchingPostSuccess(post)))
      .catch((error) => dispatch(fetchingPostError(error)))
  }
}

const initialState = Map({
  isFetching: true,
  error: '',
})

export default function posts (state = initialState, action) {
  switch (action.type) {
    case FETCHING_POST :
      return {
        ...state,
        isFetching: true,
      }
    case ADD_POST :
    case FETCHING_POST_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.post.postId]: action.post,
      }
    case FETCHING_POST_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case ADD_MULTIPLE_POSTS :
      return {
        ...state,
        ...action.posts,
      }
    default:
      return state
  }
}
