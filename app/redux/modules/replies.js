import { postReply, fetchReplies } from 'helpers/api'

const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'

function addReply (postId, reply) {
  return {
    type: ADD_REPLY,
    postId,
    reply,
  }
}

function addReplyError (error) {
  console.warn(error)
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply',
  }
}

function removeReply (postId, replyId) {
  return {
    type: REMOVE_REPLY,
    replyId,
  }
}

function fetchingReplies () {
  return {
    type: FETCHING_REPLIES
  }
}

export function fetchingRepliesError (error) {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Error fetching replies'
  }
}

function fetchingRepliesSuccess (replies, postId) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    postId,
    lastUpdated: Date.now(),
  }
}

export function addAndHandleReply (postId, reply) {
  return function (dispatch, getState) {
    const { replyWithId, replyPromise } = postReply(postId, reply)

    dispatch(addReply(postId, replyWithId))
    replyPromise.catch((error) => {
      dispatch(removeReply(postId, replyWithId.replyId))
      dispatch(addReplyError(error))
    })
  }
}

export function fetchAndHandleReplies (postId) {
  return function (dispatch) {
    dispatch(fetchingReplies())

    fetchReplies(postId)
      .then((replies) => dispatch(fetchingRepliesSuccess(replies, postId, Date.now())))
      .catch((error) => dispatch(fetchingRepliesError(error)))
  }
}

const initialStateReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
}

function postReplies (state = initialStateReply, action) {
  switch(action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      }
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }
    default:
      return state
  }
}

const initialPostState = {
  lastUpdated: Date.now(),
  replies: {},
}

function repliesAndLastUpdated (state = initialPostState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      }
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: postReplies(state.replies, action),
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_REPLIES_ERROR:
    case ADD_REPLY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.postId]: repliesAndLastUpdated(state[action.postId], action),
      }
    default:
      return state
  }
}
