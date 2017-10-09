import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feed } from 'components'
import * as feedActionCreators from 'redux/modules/feed'

export class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Feed
        postIds={this.props.postIds}
        newPostsAvailable={this.props.newPostsAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewPostsAvailable={this.props.resetNewPostsAvailable}/>
    )
  }
}

function mapStateToProps ({feed}) {
  const { newPostsAvailable, error, isFetching, postIds } = feed
  return {
    newPostsAvailable,
    error,
    isFetching,
    postIds,
  }
}

FeedContainer.PropTypes = {
  postIds: PropTypes.array.isRequired,
  newPostsAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewPostsAvailable: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(feedActionCreators, dispatch)
)(FeedContainer)
