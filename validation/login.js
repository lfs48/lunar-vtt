const validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {

    let errors = {};

    data.username = validText(data.username) ? data.username : "";
    data.password = validText(data.password) ? data.password : "";

    if(validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    }

    if(validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};