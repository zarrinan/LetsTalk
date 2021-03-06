import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as usersLikesActions from 'redux/modules/usersLikes'
import { Post } from 'components'

class PostContainer extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.goToProfile = this.goToProfile.bind(this)
  }

  goToProfile (e) {
    e.stopPropagation()
    this.context.router.history.push(`/${this.props.post.uid}`)
  }

  handleClick (e) {
    e.stopPropagation()
    this.context.router.history.push(`/post-detail/${this.props.post.postId}`)
  }

  render () {
    return (
      <Post
        goToProfile={this.goToProfile}
        onClick={this.handleClick}
        {...this.props} />
    )
  }
}

PostContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

PostContainer.propTypes = {
  post: PropTypes.object.isRequired,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
}

PostContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
}

// mapStateToProps specifies which part of the store this component is concerned about;
// and whenever they change, component will receive new props
// as an argument, this function receives the current state
function mapStateToProps ({posts, likeCount, usersLikes}, props) {
  return {
    post: posts[props.postId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.postId] === true,
    numberOfLikes: likeCount[props.postId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer)
