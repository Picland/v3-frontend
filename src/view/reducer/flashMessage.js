/**
 * @fileoverview the state management of flashMessage
 * @author mrgaonju@gmail.com
 */

const initialState = {
  show: false,
  message: ''
}

// --------------------------------------------------------------------------
// action type of FLASHMESSAGE
// --------------------------------------------------------------------------
const SHOW_FLASHMESSAGE = 'SHOW_FLASHMESSAGE'
const REMOVE_FLASHMESSAGE = 'REMOVE_FLASHMESSAGE'

// --------------------------------------------------------------------------
// reducer for FLASHMESSAGE
// --------------------------------------------------------------------------
const flashMessage = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FLASHMESSAGE:
      return {
        type: action.flashMessage.type,
        message: action.flashMessage.message,
        show: true
      }
    case REMOVE_FLASHMESSAGE:
      return {
        ...state,
        show: !state.show
      }
    default:
      return state
  }
}

// --------------------------------------------------------------------------
// action  creators
// --------------------------------------------------------------------------
export const showFlashMessage = (flashMessage) => {
  return {type: SHOW_FLASHMESSAGE, flashMessage}
}
export const removeFlashMessage = (
  {type: REMOVE_FLASHMESSAGE}
)

export default flashMessage
