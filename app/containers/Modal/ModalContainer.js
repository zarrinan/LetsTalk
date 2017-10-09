import { Modal } from 'components'
import { connect } from 'react-redux'
import * as modalActionCreators from 'redux/modules/modal'
import { bindActionCreators } from 'redux'

function mapStateToProps ({modal, users}) {
  const postTextLength = modal.postText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    postText: modal.postText,
    isOpen: modal.isOpen,
    isSubmitDisabled: postTextLength <= 0 || postTextLength > 140,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(modalActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
