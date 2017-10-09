import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
console.log(userActionCreators)

class AuthenticateContainer extends Component {

  constructor(props) {
    super(props)
    this.handleAuth = this.handleAuth.bind(this)
  }

  // propTypes: {
  //   fetchingUser: PropTypes.func.isRequired,
  //   fetchingUserFailure: PropTypes.func.isRequired,
  //   fetchingUserSuccess: PropTypes.func.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   error: PropTypes.string.isRequired,
  // }


  handleAuth (e) {
    e.preventDefault();

    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.history.replace('/feed'))

    // auth().then((user) => {
    //   this.props.fetchingUserSuccess(user.uid, user, Date.now())
    //   this.props.authUser(user.uid)
    // })
    //   .cathc((error) => this.props.fetchingUserFailure(error))
  }

  render () {
    console.log(this.props.isFetching)
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}/>
    )
  }
}

AuthenticateContainer.propTypes = {
  // fetchingUser: PropTypes.func.isRequired,
  // fetchingUserFailure: PropTypes.func.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({isFetching: state.isFetching, error: state.error}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
