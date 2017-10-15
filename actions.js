//actions to modify the users state
//when a reducer gets this action, we pass here a uid, when reducer gets this, it will change an authedId to be uid
{
  type: AUTH_USER,
  uid,
}

//when we logout, we call Unauth_user, and remove authedId and change isAuthed to false
{
  type: UNAUTH_USER,
}

//when it comes to a reducer, it'll change to true, and a component will know to load a loading screen
{
  type: FETCHING_USER,
}

//when there is en error fetching user, error in the state becomes error below
{
  type: FETCHING_USER_FAILURE,
  error: 'Error fetching user',
}

//whenever we successfully fetched a user, we add the user to the user store and update the lastUpdated with the timestamp and update user info based on user we received
{
  type: FETCHING_USER_SUCCESS,
  uid,
  user,
  timestamp,
}

//Posts
//change isFetching to true in Post property
{
  type: FETCHING_POST,
}
//error in redux-scheme becomes this message
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











