import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes,
} from 'helpers/api'

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

function addLike (postId) {
  return {
    type: ADD_LIKE,
    postId,
  }
}

function removeLike (postId) {
  return {
    type: REMOVE_LIKE,
    postId,
  }
}

function fetchingLikes () {
  return {
    type: FETCHING_LIKES,
  }
}

function fetchLikesError (error) {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
}

export function addAndHandleLike (postId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(postId))

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, postId),
      incrementNumberOfLikes(postId),
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(removeLike(postId))
      })
  }
}

export function handleDeleteLike (postId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(postId))

    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, postId),
      decrementNumberOfLikes(postId),
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(addLike(postId))
      })
  }
}

export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingLikes)
    fetchUsersLikes(uid)
      .then((likes) => dispatch(fetchingLikesSuccess(likes)))
      .catch((error) => dispatch(fetchLikesError(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

export default function usersLikes (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCHING_LIKES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LIKES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_LIKES_SUCCESS :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: '',
      }
    case ADD_LIKE :
      return {
        ...state,
        [action.postId]: true,
      }
    case REMOVE_LIKE :
      return Object.keys(state)
        .filter((postId) => action.postId !== postId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}
