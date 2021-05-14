const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { discriminatorKey: 'kind' };

const FeatureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featureType: {
        type: String,
        required: true,
        enum: ['Action', 'Bonus Action', 'Reaction', 'Passive', 'Triggered', 'Other']
    },
    sources: [{
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'sourceModel'
    }],
    sourceModel: {
        type: String,
        required: true,
        enum: ['DndClass', 'Subclass', 'Race', 'Background', 'Feat']
    },
    level: {
        type: Number,
        required: false
    }

}, {
    timestamps: true
});

module.exports = Feature = mongoose.model('Feature', FeatureSchema);