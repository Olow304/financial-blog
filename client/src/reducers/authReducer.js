import { GET_USER } from '../actions/types'
import isValid from '../testing/validator'

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER:
            return{
                ...state,
                isAuthenticated: !isValid(action.payload),
                user: action.payload
            }
        default:
            return state
    }
}