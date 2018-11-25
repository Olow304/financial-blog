import axios from 'axios'

/* 
    ref: https://bit.ly/2zpEP2Z
*/

const setUserToken = vToken => {
    if(vToken){
        axios.defaults.headers.common["Authorization"] = vToken;
    }else{
        axios.defaults.headers.common["Authorization"] = null;
    }
}

export default setUserToken;