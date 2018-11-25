import isValid from '../empty/isEmpty';
import Validator from 'validator';

/*
    Validating user-login
    @ checking is email or password is empty of invalid
*/

module.exports = function validLoginInput (data){
    let errors = {}
    data.email = !isValid(data.email) ? data.email : null;
    data.password = !isValid(data.password) ? data.password : null;

    if(!Validator.isEmail(data.email)){
        errors.email = "Invalid email address";
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "Empty email address";
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "Must have a password"
    }
    else return{
        errors,
        isValid: isEmpty(errors)
    }
}
