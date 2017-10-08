/users
  uid
    name
    uid
    avatar

/posts
  postId
    avatar
    postId
    name
    text
    timestamp
    uid (of post author)

/likeCount
  postId
    0

/usersPosts
  uid
    postId
      avatar
      postId
      name
      text
      timestamp
      uid (of post author)

/replies
  postId
    replyId
      name
      comment
      uid
      timestamp
      avatar

/usersLikes
  uid
    postId: true
