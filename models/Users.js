const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gm: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);