const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');

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
    levelFeatures: [{
        type: new Schema({
            level: Number,
            feature: {
                type: Schema.Types.ObjectId,
                ref: 'Feature'
            },
        }),
        default: []
    }],
    subclasses: [{
        type: Schema.Types.ObjectId,
        ref: 'Subclass',
        default: []
    }],
    subclassTitle: {
        type: String,
        default: ""
    },
    subclassFeatureLevels: {
        type: [Number],
        default: []
    }
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

DndClassSchema.methods.features = function() {
    return this.levelFeatures.map( (levelFeature) => levelFeature.feature);
}

module.exports = DndClass = mongoose.model('DndClass', DndClassSchema);

