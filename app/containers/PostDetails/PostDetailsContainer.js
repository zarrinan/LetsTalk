import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PostDetails } from 'components'
import * as postActionCreators from 'redux/modules/posts'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

class PostDetailsContainer extends Component {
  componentDidMount () {
    this.props.initLikeFetch(this.props.postId)
    if (this.props.postAlreadyFetched === false) {
      this.props.fetchAndHandlePost(this.props.postId)
    } else {
      this.props.removeFetching()
    }
  }

  render () {
    return (
      <PostDetails
        authedUser={this.props.authedUser}
        postId={this.props.postId}
        isFetching={this.props.isFetching}
        error={this.props.error}
        addAndHandleReply={this.props.addAndHandleReply} />
    )
  }
}

PostDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  postAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandlePost: PropTypes.func.isRequired,
  initLikeFetch: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

function mapStateToProps ({ posts, likeCount, users }, props) {
  const postId = props.match.params.postId
  return {
    postId,
    authedUser: users[users.authedId].info,
    isFetching: posts.isFetching || likeCount.isFetching,
    error: posts.error,
    postAlreadyFetched: !!posts[postId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...postActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetailsContainer)
