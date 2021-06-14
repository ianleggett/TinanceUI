import { combineReducers } from "redux"
import auth from "./auth/"
import superAdmin from "./superAdmin/"

const rootReducer = combineReducers({
  auth: auth,
  superAdmin: superAdmin,
})

export default rootReducer
