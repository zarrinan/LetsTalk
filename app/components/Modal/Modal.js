import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newPostTop, pointer, newPostInputContainer,
  newPostInput, submitPostBtn, darkBtn } from './styles.css'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

export default function Modal (props) {
  function submitPost () {
    console.log('Duck', props.postText)
    console.log('user', props.user)
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      Post
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newPostTop}>
          <span>{'Compose new Post'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newPostInputContainer}>
          <textarea
            onChange={(e) => props.updatePostText(e.target.value)}
            value={props.postText}
            maxLength={140}
            type='text'
            className={newPostInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitPostBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitPost}>
          Post
        </button>
      </ReactModal>
    </span>
  )
}

const {object, string, func, bool} = PropTypes
Modal.PropTypes = {
  postText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updatePostText: func.isRequired,
}
