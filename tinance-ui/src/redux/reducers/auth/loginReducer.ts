export const login = (state = {},action) => {
  switch (action.type) {
    case "JWT_AUTH_LOGIN": {
      return { ...state, authData : action.data.userData, companyData : action.data.companyData};
    }
    case "JWT_AUTH_COMPANY": {
      return { ...state, companyData : action.data }
    }
    case "JWT_AUTH_CHECK": {
      return { ...state, authCheck : action.data }
    }
    default: {
      return state
    }
  }
}
