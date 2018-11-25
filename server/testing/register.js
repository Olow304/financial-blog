import isEmpty from '../empty/isEmpty'
import Validator from 'validator'

/*
    Validating user-register page
    @ checking is email or password is empty of invalid
*/

module.exports = function validRegister(data){
    let errors = {}
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    //data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if(!Validator.isLength(data.username, {min: 3, max: 20})) {
        errors.username = "Username must be between 3 and 20 characters"
    }
    if(Validator.isEmpty(data.username)){
        errors.username = "username is required"
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "email is required"
    }
    if(!Validator.isEmail(data.email)){
        errors.email = "invalid email address"
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "password is required"
    }
    if(!Validator.isLength(data.password, {min: 5, max: 20})){
        errors.password = "passwrod must be between 3 and 20 characters"
    }
    // if(Validator.isEmpty(data.password2)){
    //     errors.password2 = "password is required"
    // }
    // if(!Validator.equals(data.password, data.password2)){
    //     errors.password2 = "password does not match"
    // }
     
    return {
        errors,
        isValid: isEmpty(errors)
    }
}