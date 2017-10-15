
//redux store of states
//getting all initial states out of components
//and putting them all in one location,
//here is the design of that object
//what is the minimal representation of our app
//state as an object?
//converting firebase schema into redux-schema
//in redux one object can be referenced from another object

{
  users: {
    //when a user is authed this will be set to true,
    //and before routes are changed this value will be checked,
    //if this true or not
    isAuthed,
    //whenever I fetch a new user, for example, go to a profile page,
    //isFetching will be changed to 'true' and the loading screen
    //will be rendered
    isFetching,
    //when component mounts, if there is an error the error message
    //will be on the screen
    error,
    //keep track of authed users' ids, so whenever we go to the user
    //settings, we know we can just query users/authedId and it will
    //give us an authenticated user's information
    authedId,
    [uid]: {
    //whenever we go to a user's profile, if lastUpdated was like
    //5 mins ago (defined in the settings), the chances are information
    //wasn't changed, so don't fetch again, through this setting
    //the app is relying heavily on redux cash, then fetching new information
    //every time
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      }
    }
  },

  //reduc store should be aware if the modal for adding new posts is open or not,
  modal: {
    post,
    isOpen
  },
  posts: {
    [postId]: {
      lastUpdated,
      info: {
        avatar,
        postId,
        name,
        text,
        timestamp,
        uid,
      }
    }
  },
  likeCount: {
    [postId]: 0
  },
  //usersPosts reference Posts
  usersPosts: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      postIds: [postId, postId, postId]
    }
  },
  usersLikes: {
    postId: true,
  }
  feed: {
    isFetching,
    error,
    //boolean, if it's true, 'new post' notification will pop up,
    newPostsAvailable,
    //when new post is added, its id will be added to an array of new posts
    postIdsToAdd: [postId, postId],
    //all post ids that are already in the feed
    postIds: [postId, postId, postId]
  }
  replies: {
    //when a user goes to a replies route, isFetching
    //by default is set to true, and once the information
    //gets back, it will be changed to false, so this way we'll know rather it should show Fetching or the actual Post details view
    isFetching,
    //if there is an error fetching is will appear instead of replies
    error,
    [postId]: {
      lastUpdated,
      replies: {
        [replyId]: {
          name,
          reply,
          uid,
          timestamp,
          avatar
        }
      }
    }
  },
  //whenever we go to a home route, we set a firebase listener to an endpoint, whenever there is a new addition, it notifies
  listeners: {
    [listenerId]: true
  }
}


















