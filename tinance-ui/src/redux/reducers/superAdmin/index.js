import { combineReducers } from "redux"
import { superAdmin } from "./superAdminReducer"

const authReducers = combineReducers({
    superAdmin,
})

export default authReducers