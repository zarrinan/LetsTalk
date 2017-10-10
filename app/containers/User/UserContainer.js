import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersPostsActionCreators from 'redux/modules/usersPosts'
import { staleUser, stalePosts } from 'helpers/utils'

class UserContainer extends Component {
  componentDidMount () {
    const uid = this.props.match.params.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid)
    }
    if (this.props.noUser === true || stalePosts(this.props.lastUpdatedPosts)) {
      this.props.fetchAndHandleUsersPosts(uid)
    }
  }

  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        postIds={this.props.postIds} />
    )
  }
}

UserContainer.PropTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  postIds: PropTypes.array.isRequired,
  fetchAndHandleUsersPosts: PropTypes.func.isRequired,
  fetchAndHandleUser: PropTypes.func.isRequired,
  lastUpdatedUser: PropTypes.number.isRequired,
  lastUpdatedPosts: PropTypes.number.isRequired,

}

function mapStateToProps ({users, usersPosts}, props) {
  const uid = props.match.params.uid
  const user = users[uid]
  const specificUsersPosts = usersPosts[uid]
  const noUser = typeof user === 'undefined'
  return {
    noUser,
    isFetching: users.isFetching || usersPosts.isFetching,
    error: users.error || usersPosts.error,
    postIds: specificUsersPosts ? specificUsersPosts.postIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedPosts: specificUsersPosts ? specificUsersPosts.lastUpdated : 0,
    name: noUser ? '' : user.info.name,
  }
}

function mapDispatchtoProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersPostsActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(UserContainer)
