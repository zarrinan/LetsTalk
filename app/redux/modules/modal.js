const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT'

function openModal () {
  return {
    type: OPEN_MODAL,
  }
}

function closeModal () {
  return {
    type: CLOSE_MODAL,
  }
}

function updatePostText (newPostText) {
  return {
    type: UPDATE_POST_TEXT,
    newPostText,
  }
}

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
