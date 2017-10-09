import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newPostTop, pointer, newPostInputContainer,
  newPostInput, submitPostBtn, darkBtn } from './styles.css'

export default function Modal (props) {
  return (
    <div>Modal</div>
  )
}

const {object, string, func, bool} = PropTypes
Modal.PropTypes = {
  PostText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
}
