import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
// connect allows us to connect this component to redux store
import { connect } from 'react-redux'
// it allows to bind a dispatch to a specific actionCreator, pass that actionCreator in, as a prop
import { bindActionCreators } from 'redux'
// as we authenticate the user, we want to call userActionCreators to update the state
import * as userActionCreators from 'redux/modules/users'
console.log(userActionCreators)

class AuthenticateContainer extends Component {

  constructor (props) {
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

  // function -> name of actionCreator it invokes -> go to actions, find that action by name -> find type of action -> go to reducers -> find that type of action in a reducer -> find what changes it does to the state -> apply those changes to the copy of the state  -> replace state -> other components, which are subscribed to that action type, also update
  // actionCreators invokator should alway be wrapped in dispatch

  // when handleAuth ran, we dispatched a specific actionCreator, that came in users file (which contains actions and reducers) and invoked function with the same name, passing 'dispatch' action object from the function, and then ran through every reducer in the app and searched for 'FETCHING_USER' and when it found it, it updated the state

  // the way we change the state in redux is by dispatching the invokation of different actioncreators, and then, all of the reducers will be called with that specific type that's coming from the thing that got returned from the actioncreator, and when there is a match, it will return a brand new state
  handleAuth (e) {
    e.preventDefault()
    // as we authenticate the user, we call userActionCreators to update the state, by wrapping them is dispatch
    // whenever handleAuth is called the current state isFetching in 'users' will change to 'true'
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

// in propTypes, we add pieces of data we concern about from the store
AuthenticateContainer.propTypes = {
  // fetchingUser: PropTypes.func.isRequired,
  // fetchingUserFailure: PropTypes.func.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

// we need this for the router
AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(
  // mapStateToProps specifies which part of the store this component is concerned about;
  // and whenever they change, component will receive new props
  // (whenever isFetching or error changes, the component is going to receive new props)
  ({users}) => ({isFetching: users.isFetching, error: users.error}),
  // with dispatch we grab action creators from reducers and change the state accordingly
  // to bindActionCreators we pass two arguments, 1st: the 'dispatch' and 2nd: an object, whose values are action creators
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
