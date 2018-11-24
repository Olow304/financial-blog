import isValid from '../empty/isEmpty'
import Valid from 'validator'

/*
    Validating user-register page
    @ checking is email or password is empty of invalid
*/

module.exports = validRegister(data) => {
    let errors = {}
    data.username = !isValid(data.username) ? data.username : null;
    data.email = !isValid(data.email) ? data.email : null;
    data.password = !isValid(data.password) ? data.password : null;
    data.comfirmPassword = !isValid(data.comfirmPassword) ? data.comfirmPassword : null;

    if(!Valid.isLength(data.username, {min: 3, max: 20})) {
        errors.username = "Username must be between 3 and 20 characters"
    }
    if(Valid.isEmpty(data.name)){
        errors.username = "username is required"
    }
    if(!Valid.isEmail(data.email)){
        errors.email = "invalid email address"
    }
    if(Valid.isEmpty(data.email)){
        errors.email = "email is required"
    }

    if(!Valid.isLength(data.password, {min: 5, max: 20})){
        errors.password = "passwrod must be between 3 and 20 characters"
    }
    if(Valid.isEmpty(data.password)){
        errors.password = "password is required"
    }
    if(Valid.isEmpty(data.comfirmPassword)){
        errors.comfirmPassword = "password is required"
    }
    if(!Valid.equals(data.password, data.comfirmPassword)){
        errors.comfirmPassword = "password does not match"
    }
    else return {
        errors,
        isValid: isEmpty(errors)
    }
}