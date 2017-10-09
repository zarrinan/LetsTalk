import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Logout } from 'components'
import { logoutAndUnauth } from 'redux/modules/users'
import { connect } from 'react-redux'

export class LogoutContainer extends Component {
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  }

  render () {
    return (
      <Logout />
    )
  }
}

LogoutContainer.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(LogoutContainer)
