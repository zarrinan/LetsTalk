import React, { Component } from 'react'
import { container, innerContainer } from './styles.css'

class MainContainer extends Component {
  render () {
    return (
      <div className={container}>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default MainContainer
