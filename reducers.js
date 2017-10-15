//creating reducers that will take current state and actions as an argument
//a reducer must be a pure function, i.e. not modifiying a state, but returning a new one. For that reason, a reducer will return 'Object.assign({}, state, { state.key: newValue,})', or with spread operator '{...state, state.key: newValue}' an object, representing new state.

//Users
//All of state values in a store have to have some default values. The very first time redux calls any of reducers functions, state is going to be undefined. So we should set up initial state it won't return undefined
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

//here we set state to initial value so when reducer is called for the first time, the state is not undefined
function user (state = initialUserState, action) {
  //switch statement will look at action.type and based off this action.type it will modify the current state in a certain way
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
    return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {
  switch (action.type) {
//when it's called, get the 'users' state (from the store, defined in redux-schema) and apply action with name AUTH_USER, and modify the part described in action 'AUTH_USER' to the 'users' state and return a new modified 'users' state
    case AUTH_USER :
      return {
        ...state,
//from redux schema, if a user is authed, isAuthed will change to 'true'
        isAuthed: true,
//and authedId will be the uid that we passed when we did Authed user
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS :
      return action.user === null
      ? {
        ...state,
        isFetching: false,
        error: '',
      }
      : {
        ...state,
        isFetching: false,
        error: '',
        //reducer composition which takes a slice of the state defined in the reducer 'user' above
        [action.uid]: user(state[action.uid], action),
      }
 //we have to set the default to current state, bc when an action gets dispatched it will go to all reducers and for ex, if we don't return anything from this reducer (action is not defined here) this part of the state will be set to undefined
    default:
      return state
  }
}

//Posts
const initialState = {
  isFetching: true,
  error: '',
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case FETCHING_POST :
      return {
        ...state,
        isFetching: true,
      }
  //they both do the same thing, so placed on top of each other
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

//Feed
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

//Listeners
export default function listeners (state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: true,
      }
    default:
      return state
  }
}

//Modal
const initialState = {
  postText: '',
  isOpen: false,
}

export default function modal (state = initialState, action) {
  switch(action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        postText: '',
        isOpen: false,
      }
    case UPDATE_POST_TEXT :
      return {
        ...state,
        postText: action.newPostText,
      }
    default :
      return state
  }
}

//usersLikes
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

//likeCount

function count (state = 0, action) {
  switch (action.type) {
    case ADD_LIKE :
      return state + 1
    case REMOVE_LIKE :
      return state - 1
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

export default function likeCount (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_COUNT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_COUNT_SUCCESS :
    return {
      ...state,
      ...initialState,
      [action.postId]: action.count,
    }
    case ADD_LIKE :
    case REMOVE_LIKE :
    return typeof state[action.postId] === 'undefined'
      ? state
      : {
        ...state,
        [action.postId]: count(state[action.postId], action),
      }
      default :
        return state
  }
}

//usersPosts

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
          [action.uid]: usersPost(state[action.uid], action)
        }
    default :
      return state
  }
}

//Replies
const initialReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
}

function postReplies (state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY :
      return {
        ...state,
        [action.reply.replyId]: action.reply,
      }
    case REMOVE_REPLY :
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }
    default :
      return state
  }
}

const initialPostState = {
  lastUpdated: Date.now(),
  replies: {},
}

function repliesAndLastUpdated (state = initialPostState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      }
    case ADD_REPLY :
    case REMOVE_REPLY :
      return {
        ...state,
        replies: postReplies(state.replies, action),
        }
    default :
      return state
    }
  }

const initialState = {
  isFetching: true,
  error: '',
}

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_REPLIES_ERROR :
    case ADD_REPLY_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case ADD_REPLY :
    case FETCHING_REPLIES_SUCCESS :
    case REMOVE_REPLY :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.postId]: repliesAndLastUpdated(state[action.postId], action),
      }
    default :
      return state
  }
}










