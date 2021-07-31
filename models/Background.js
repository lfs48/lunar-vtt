const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BackgroundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    features: [{
        type: Schema.Types.ObjectId,
        ref: "Feature",
        default: []
    }]
}, {
    timestamps: true
});

module.exports = Background = mongoose.model('Background', BackgroundSchema);