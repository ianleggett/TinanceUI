export const register = (state = {}, action) => {
  switch (action.type) {
    case "JWT_AUTH_SIGNUP":
      return { ...state, authData : action.payload }
    default: {
      return state
    }
  }
}
