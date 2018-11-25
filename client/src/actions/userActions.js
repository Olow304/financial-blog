import axios from 'axios'
import { CLEAR_PROFILE, GET_ERRORS } from './types'

export const clearCurrProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}