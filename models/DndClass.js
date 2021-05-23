const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');

let defaultFeatures = {};
[...Array(20).keys()].forEach( (n) => {
    defaultFeatures[(n+1).toString()] = []
});

const DndClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    hitDie: {
        type: String,
        default: "1d6"
    },
    armor: {
        type: String,
        default: ""
    },
    weapons: {
        type: String,
        default: ""
    },
    tools: {
        type: String,
        default: ""
    },
    saves: {
        type: String,
        default: ""
    },
    skills: {
        type: String,
        default: ""
    },
    equipment: {
        type: [String],
        default: []
    },
    spellcasting: {
        type: String,
        enum: ['None', 'Third', 'Half', 'HalfPlus', 'TwoThirds', 'Full'],
        default: 'None'
    },
    tableCols: {
        type: Map,
        of: [String],
        default: {}
    },
    features: {
        type: Map,
        of: {
            type: [Schema.Types.ObjectId],
            ref: 'Feature'
        },
        default: defaultFeatures
    },
    subclasses: [{
        type: Schema.Types.ObjectId,
        ref: 'Subclass',
        default: []
    }]
}, {
    timestamps: true
});

DndClassSchema.post("findOneAndDelete", async (document) => {
    const classId = document._id;
    await Feature.updateMany(
        { 
            sources: { 
                $in: [classId] 
            }
        },
        { 
            $pull: {
                sources: classId
            } 
        }
    )
});

module.exports = DndClass = mongoose.model('DndClass', DndClassSchema);

