const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feature = require('./Feature');
const DndClass = require('./DndClass');

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
        default: {}
    }
}, {
    timestamps: true
});

SubclassSchema.post("findOneAndDelete", async (document) => {
    const subclassId = document._id;
    await Feature.updateMany(
        { 
            sources: { 
                $in: [subclassId] 
            }
        },
        { 
            $pull: {
                sources: subclassId
            } 
        }
    )
    await DndClass.updateOne(
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

