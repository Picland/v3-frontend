/**
 * @fileview the state management of header
 * @author mrgaonju@gmail.com
 */

const initialState = {
  avatarHover: false
}

// --------------------------------------------------------------------------
// action type of HEADER
// --------------------------------------------------------------------------
const MOUSE_OVER = 'MOUSE_OVER'
const MOUSE_OUT = 'MOUSE_OUT'

// --------------------------------------------------------------------------
// reducer for HEADER
// --------------------------------------------------------------------------
const header = (state = initialState, action) => {
  switch (action.type) {
    case MOUSE_OVER:
      return {
        avatarHover: true
      }
    case MOUSE_OUT:
      return {
        avatarHover: false
      }
    default:
      return state
  }
}

// --------------------------------------------------------------------------
// action  creators
// --------------------------------------------------------------------------
export const onMouseOver = () => ({
  type: MOUSE_OVER
})
export const onMouseOut = () => ({
  type: MOUSE_OUT
})

export default header
