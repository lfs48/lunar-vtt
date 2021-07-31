const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');

const RaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    speed: {
        type: Number,
        default: 30
    },
    size: {
        type: String,
        default: "Medium",
        enum: ["Small", "Medium", "Large"]
    },
    features: [{
        type: Schema.Types.ObjectId,
        ref: "Feature",
        default: []
    }],
}, {
    timestamps: true
});

module.exports = Race = mongoose.model('Race', RaceSchema);
