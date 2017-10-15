import React, { Component } from 'react'
import PropTypes from 'prop-types'
// bindActionCreators takes in an object, who's keys are action creators, and returns an object who's properties are those same action creators but after wrapping them all in dispatch
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PostDetails } from 'components'
// this will create an object called postActionCreators, which is everything that get exported from 'redux/modules/posts' file. values of the object are actionCreators
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

// which part of the state this component cares about
// the first argument for connect that specifyes exactly what properties from our single state tree we want to pass into the component we're connecting
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

// mapping dispatch to props so that the methods on the object it returns will be passed as props to the component. mapDispatchToProps + bindActionCreators allow to pass in certain action creators into a component which don't need to be wrapped in dispatch()
// we pass to bindActionsCreators an object, whose values are actionCreators
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...postActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
}

// connect returns a function and the first argument of the function is a component
// connecting component to Redux, so that the dispatch function comes in as a prop to component
// The first argument that connect receives is a function specifying exactly what properties from our single state tree we want to pass into the component we're connecting
export default connect(
  // the first function we pass to connect is going to receive the current state
  mapStateToProps,
  mapDispatchToProps,
)(PostDetailsContainer)
