import React from 'react'
import PropTypes from 'prop-types'

import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import Comment from 'react-icons/lib/fa/comment'
import Sun from 'react-icons/lib/fa/certificate'

import {
  postContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'

Post.propTypes = {
  post: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired,
}

export default function Post (props) {
  const starIcon = props.isLiked === true ? likedIcon : icon
  const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike
  const cursorValue = props.hideReplyBtn === true ? 'default' : 'pointer'
  return (
    <div
      className={postContainer}
      style={{cursor: cursorValue}}
      onClick={props.onClick}>
      <img src={props.post.avatar} className={avatar} />
      <div className={contentContainer}>
        <div className={header}>
          <div onClick={props.goToProfile} className={author}>{props.post.name}</div>
          <div>{formatTimestamp(props.post.timestamp)}</div>
        </div>
        <div className={text}>{props.post.text}</div>
        <div className={likeReplyContainer}>
          {!props.hideReplyBtn &&
            <Comment className={icon} />}
          <div className={actionContainer}>
            <Sun
              className={starIcon}
              onClick={(e) => starFn(props.post.postId, e)} />
            {!props.hideLikeCount &&
              <div>{props.numberOfLikes}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
