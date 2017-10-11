import React, { Component } from 'react'
import { container, title, slogan } from './styles.css'

export class Home extends Component {
  render () {
    return (
      <div className={container}>
        <p className={title}>Let's Talk</p>
        <p className={slogan}></p>
      </div>
    )
  }
}

export default Home
