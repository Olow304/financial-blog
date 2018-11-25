//outside libraries
import axios from 'axios'
import jwt_decode from "jwt-decode"
import setUserToken from '../utils/userToken'
import { GET_USER, GET_ERROR } from '../actions/types'

/*
    @PRAMS: userData, history
    Desc:   Allow user to register, if they already register -> redirect to login page
*/
export const userRegister = (data, history) => dispatch => {
    axios.post("/api/users/register", data).then(res => history.push("/login")).catch(err => {
        dispatch({type: GET_ERROR, payload: err.response.data})
    })
}

/*
    @PRAMS: data
    Desc:   Allow user to login. We'll storing user token in localStorage
    ref: https://bit.ly/2DVBuMT
*/
export const userLogin = data => dispatch => {
    axios.post("/api/users/login", data).then(res => {
        localStorage.setItem("jwtToken", res.data.token)
        setUserToken(res.data.token)
        // decoding token
        dispatch(getCurrentUser(jwt_decode(res.data.token)))
    }).catch(err => {
        dispatch({type: GET_USER, payload: err.response.data})
    })
}


/*
    @PRAMS: decode
    Desc:   Set logged in user to current user
*/
export const getCurrentUser = vDecode => {
    return {
        type: GET_USER,
        payload: vDecode
    }
}

/*
    @PRAMS: None
    Desc:   What happens when user logout
    Step 1: remove user token from localstorage
    Step 2: remove auth header
    Step 3: remove the current user - set to empty
*/
export const userLogout = () => dispatch => {
    localStorage.removeItem("jwtToken")     // Step 1
    setUserToken(false)                     // Step 2
    dispatch(getCurrentUser({}))            // Step 3
}
