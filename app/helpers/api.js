import { ref } from 'config/constants'

function saveToPosts (post) {
  const postId = ref.child('posts').push().key
  const postPromise = ref.child(`posts/${postId}`).set({...post, postId})
  return {
    postId,
    postPromise,
  }
}

function saveToUsersPosts (post, postId) {
  return ref.child(`usersPosts/${post.uid}/${postId}`)
    .set({...post, postId})
}

function saveLikeCount (postId) {
  return ref.child(`likeCount/${postId}`).set(0)
}

export function savePost (post) {
  const { postId, postPromise } = saveToPosts(post)

  return Promise.all([
    postPromise,
    saveToUsersPosts(post, postId),
    saveLikeCount(postId),
  ]).then(() => ({...post, postId}))
}

export function listenToFeed (cb, errorCB) {
  ref.child('posts').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => feed[b].timestamp - feed[a].timestamp)
    cb({feed, sortedIds})
  }, errorCB)
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, postId) {
  return ref.child(`usersLikes/${uid}/${postId}`).set(true)
}

export function deleteFromUsersLikes (uid, postId) {
  return ref.child(`usersLikes/${uid}/${postId}`).set(null)
}

export function incrementNumberOfLikes (postId) {
  return ref.child(`likeCount/${postId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (postId) {
  return ref.child(`likeCount/${postId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUsersPosts (uid) {
  return ref.child(`usersPosts/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchPost (postId) {
  return ref.child(`posts/${postId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchLikeCount (postId) {
  return ref.child(`likeCount/${postId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function postReply (postId, reply) {
  const replyId = ref.child(`replies/${postId}`).push().key
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${postId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise,
  }
}

export function fetchReplies (postId) {
  return ref.child(`replies/${postId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
