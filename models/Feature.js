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
        default: ""
    },
    featureType: {
        type: String,
        default: 'Action',
        enum: ['Action', 'Bonus Action', 'Reaction', 'Passive', 'Triggered', 'Other']
    },
    sources: [{
        type: Schema.Types.ObjectId,
        default: [],
        refPath: 'sourceModel'
    }],
    sourceModel: {
        type: String,
        default: 'DndClass',
        enum: ['DndClass', 'Subclass', 'Race', 'Background', 'Feat']
    }

}, {
    timestamps: true
});

module.exports = Feature = mongoose.model('Feature', FeatureSchema);