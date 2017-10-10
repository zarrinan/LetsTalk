import React from 'react'
import PropTypes from 'prop-types'
import { newPostContainer, header } from './styles.css'
import { PostContainer } from 'containers'
import { errorMsg } from 'shared/styles.css'

NewPostsAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

function NewPostsAvailable ({handleClick}) {
  return (
    <div className={newPostContainer} onClick={handleClick}>
      New Posts Available
    </div>
  )
}

export default function Feed (props) {
  return props.isFetching === true
    ? <h1 className={header}>{'Fetching'}</h1>
    : <div>
      {props.newPostsAvailable ? <NewPostsAvailable handleClick={props.resetNewPostsAvailable} /> : null}
      {props.postIds.length === 0
        ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no posts yet 😞'}</p>
        : null}
      {props.postIds.map((id) => (
        <PostContainer
          postId={id}
          key={id} />
      ))}
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
}

Feed.propTypes = {
  postIds: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newPostsAvailable: PropTypes.bool.isRequired,
  resetNewPostsAvailable: PropTypes.func.isRequired,
}
