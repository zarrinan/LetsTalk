import React from 'react'
import PropTypes from 'prop-types'
import { centeredContainer, largeHeader, errorMsg } from 'shared/styles.css'
import { FacebookAuthButton } from 'components'
import { loginHeader } from './styles.css'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Authenticate ({error, isFetching, onAuth}) {
  return (
    <div className={centeredContainer}>
      <h1 className={loginHeader}>Login</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
