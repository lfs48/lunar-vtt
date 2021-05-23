const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');

let defaultFeatures = {};
[...Array(20).keys()].forEach( (n) => {
    defaultFeatures[(n+1).toString()] = []
});

const SubclassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    spellcasting: {
        type: String,
        enum: ['None', 'Third', 'Half', 'HalfPlus', 'TwoThirds', 'Full'],
        default: 'None'
    },
    dndClass: {
        type: Schema.Types.ObjectId,
        ref: 'DndClass',
        required: true
    },
    features: {
        type: Map,
        of: {
            type: [Schema.Types.ObjectId],
            ref: 'Feature'
        },
        default: defaultFeatures
    }
}, {
    timestamps: true
});

SubclassSchema.post("findOneAndDelete", async (document) => {
    const subclassId = document._id;
    await Feature.updateMany(
        { 
            subclasses: { 
                $in: [subclassId] 
            }
        },
        { 
            $pull: {
                subclasses: subclassId
            } 
        }
    )
});

module.exports = Subclass = mongoose.model('Subclass', SubclassSchema);

