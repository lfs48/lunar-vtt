const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');

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
    equipment: {
        type: [String]
    },
    features: {
        type: [ClassTableSchema]
    },
    classTable: {
        type: [Map]
    }

}, {
    timestamps: true
});

const ClassFeaturesSchema = new Schema({
    type: Map,
    of: Feature
})

const ClassTableSchema = new Schema({
    type: Map,
    of: String
})

module.exports = mongoose.model('DndClass', DndClassSchema);