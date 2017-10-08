{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      }
    }
  },
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
    newPostsAvailable,
    postIdsToAdd: [postId, postId],
    postIds: [postId, postId, postId]
  }
  replies: {
    isFetching,
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
  listeners: {
    [listenerId]: true
  }
}


















