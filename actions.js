//users
{
  type: AUTH_USER,
  uid,
}

{
  type: UNAUTH_USER,
}

{
  type: FETCHING_USER,
}

{
  type: FETCHING_USER_FAILURE,
  error: 'Error fetching user',
}

{
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp,
}

//Posts
{
  type: FETCHING_POST,
}

{
  type: FETCHING_POST_ERROR,
  error: 'Error fetching post',
}

{
  type: FETCHING_POST_SUCCESS,
  post,
}

{
  type: REMOVE_FETCHING,
}

{
  type: ADD_POST,
  post,
}

{
  type: ADD_MULTIPLE_POSTS,
  posts,
}

//Feed

{
  type: SETTING_FEED_LISTENER,
}

{
  type: SETTING_FEED_LISTENER_ERROR,
  error: 'Error fetching feeds.',
}

{
  type: SETTING_FEED_LISTENER_SUCCESS,
  postIds,
}

{
  type: ADD_NEW_POST_ID_TO_FEED,
  postId,
}

{
  type: RESET_NEW_POSTS_AVAILABLE,
}


//Listeners
 {
  type: ADD_LISTENER,
  listenerId,
 }


//Modal

{
  type: OPEN_MODAL,
}

{
  type: CLOSE_MODAL,
}

{
  type: UPDATE_POST_TEXT,
  newPostText,
}

//Replies

{
  type: FETCHING_REPLIES,
}

{
  type: FETCHING_REPLIES_ERROR,
  error: 'Error fetching replies',
}

{
  type: FETCHING_REPLIES_SUCCESS,
  replies,
  postId,
  lastUpdated: Date.now(),
}

{
  type: ADD_REPLY,
  postId,
  reply,
}

{
  ADD_REPLY_ERROR,
  error: 'Error adding reply',
}

{
  type: REMOVE_REPLY,
  replyId,
  postId,
}

//likeCount

{
  type: FETCHING_COUNT,
}

{
  type: FETCHING_COUNT_ERROR,
  error: 'Error fetching post\'s like count',
}

{
  type: FETCHING_COUNT_SUCCESS,
  postId,
  count,
}

//UsersPosts
{
  type: FETCHING_USERS_POSTS,
  uid,
}

{
  type: FETCHING_USERS_POSTS_ERROR,
  error: 'Error fetching users post Ids',
}

{
  type: FETCHING_USERS_POSTS_SUCCESS,
  uid,
  postIds,
  lastUpdated,
}


{
  type: ADD_SINGLE_USERS_POST,
  uid,
  postIds,
  lastUpdated,
}

//usersLikes

{
  type: FETCHING_LIKES,
}

{
  type: FETCHING_LIKES_ERROR,
  error: 'Error fetching likes',
}

{
  type: FETCHING_LIKES_SUCCESS,
  likes,
}

{
  type: ADD_LIKE,
  postId,
}

{
  type: REMOVE_LIKE,
  postId,
}











