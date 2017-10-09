import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { container, innerContainer } from './styles.css'
import { Navigation } from 'components'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class MainContainer extends Component {
  render () {
    console.log('props', this.props)
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.PropTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default withRouter(connect(
  (state) => ({isAuthed: state.isAuthed})
)(MainContainer))
