import React from 'react'
import PropTypes from 'prop-types'
import { userContainer, header } from './styles.css'
import { errorMsg } from 'shared/styles.css'
import { PostContainer } from 'containers'

export default function User (props) {
  return props.noUser === true
    ? <p className={header}>{'This user doesnt exist. 👽'}</p>
    : <div>
        {props.isFetching === true
          ? <p className={header}>{'Loading'}</p>
          : <div>
              <div className={userContainer}>
                <div>{props.name}</div>
              </div>
              {props.postIds.map((id) => (
                <PostContainer
                  postId={id}
                  key={id} />
              ))}
              {props.postIds.size === 0
                ? <p className={header}>
                    {`It looks like ${props.name.split(' ')[0]} hasn't made any posts yet.`}
                  </p>
                : null}
            </div>}
        {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      </div>
}


User.PropTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  postIds: PropTypes.array.isRequired,
}
