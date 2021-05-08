const validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateClassInput(data) {

    let errors = {};

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};