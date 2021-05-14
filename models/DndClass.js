const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');

// const ClassFeaturesSchema = new Schema({
//     features: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Feature'
//     }]
// });

// const ClassFeature = mongoose.model('DndClass', ClassFeaturesSchema);

const DndClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    hitDie: {
        type: String,
        required: true
    },
    armor: {
        type: String
    },
    weapons: {
        type: String
    },
    tools: {
        type: String
    },
    saves: {
        type: String
    },
    skills: {
        type: String
    },
    equipment: [{
        type: String
    }],
    tableCols: {
        type: Map,
        of: [String]
    },
    features: [{
        feature: {
            type: Schema.Types.ObjectId,
            ref: 'Feature'
        },
        level: {
            type: Number
        }
    }]
}, {
    timestamps: true
});

module.exports = DndClass = mongoose.model('DndClass', DndClassSchema);