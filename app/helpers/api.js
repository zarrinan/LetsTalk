import { ref } from 'config/constants'

function saveToPosts (post) {
  const postId = ref.child('posts').push().key
  const postPromise = ref.child(`posts/${postId}`).set({...post, postId})
  return {
    postId,
    postPromise
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
