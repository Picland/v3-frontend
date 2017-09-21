import constActionType from '../constant/actionType'

/**
 * Show flash message.
 *
 * @param {Object} [flashMessage] The message responsed from server.
 * @returns {Action}
 * @public
 */
export const showFlashMessage = flashMessage => ({
  type: constActionType.SHOW_FLASHMESSAGE,
  flashMessage
})

/**
 * Remove flash message.
 *
 * @returns {Action}
 * @public
 */
export const removeFlashMessage = () => ({
  type: constActionType.REMOVE_FLASHMESSAGE
})
