import { combineReducers } from 'redux'
import authReducer from './authReducer'


// combine all reducers
export default combineReducers({
    auth: authReducer
})