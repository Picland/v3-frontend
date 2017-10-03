import constActionType from '../constant/actionType'

const initialState = {
  type: '',
  show: false,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constActionType.SHOW_FLASHMESSAGE:
      return {
        type: action.flashMessage.type,
        message: action.flashMessage.message,
        show: true
      }
    case constActionType.REMOVE_FLASHMESSAGE:
      return initialState
    default:
      return state
  }
}
