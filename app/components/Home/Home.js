import React, { Component } from 'react'
import { container, title, slogan } from './styles.css'

export class Home extends Component {
  render () {
    return (
      <div className={container}>
        <p className={title}>{'Social'}</p>
        <p className={slogan}>{'Social platform'}</p>
      </div>
    )
  }
}

export default Home
