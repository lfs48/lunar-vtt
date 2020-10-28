const validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {

    let errors = {};

    data.username = validText(data.username) ? data.username : "";
    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";

    if(validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    }

    if( !validator.isEmpty(data.username) && !validator.isAlphanumeric(data.username)) {
        errors.username = "Username can contain only letters and/or numbers";
    }

    if(validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Password must be confirmed';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};