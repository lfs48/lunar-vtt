const { Model } = require('mongoose');
const DndClassModel = require('../models/DndClass');
const FeatureModel = require('../models/Feature');
const SubclassModel = require('../models/Subclass');

const SubclassController = {
    index: async (req, res) => {
        const allSubclasses = await SubclassModel.find({});
        const subclassFeatures = await Feature.find({sourceModel: 'Subclass'});
        res
        .status(200)
        .json({
            success: true,
            subclasses: allSubclasses,
            features: subclassFeatures
        });
    },
    create: async (req, res) => {
        try {
            const params = subclassParams(req.body);
            const newSubclass = await Subclass.create(params);
            await DndClassModel.updateOne(
                {
                    _id: params.dndClass
                },
                {
                    $addToSet: {
                        subclasses: newSubclass._id
                    }
                }
            );
            await FeatureModel.updateMany(
                {
                    _id: {
                        $in: newSubclass.features()
                    }
                },
                {
                    $addToSet: {
                        sources: newSubclass._id
                    }
                }
            );
            const subclassFeatures = await FeatureModel
            .find({
                _id: {
                    $in: newSubclass.features()
                }
            });
            res
            .status(201)
            .json({
                success: true,
                subclass: newSubclass,
                features: subclassFeatures
            });
        } catch (e) {
            res
            .status(400)
            .json({
                success: false,
                error: e.message
            })
        }
    },
    update: async (req, res) => {
        try {
            // Update class with request params
            const params = subclassParams(req.body);
            const foundClass = await SubclassModel.findById(req.params.subclassId);
            await foundClass.update(subclassParams(req.body));
            const newClass = await SubclassModel.findById(req.params.subclassId);

            // Cascade updates to features added/removed in update
            if ("levelFeatures" in params) {
                // Generate list of features added & removed in update
                let oldFeatures = foundClass.features();
                let newFeatures = newClass.features();
                const addedFeatures = newFeatures.filter(feature => !oldFeatures.includes(String(feature) ) );
                const removedFeatures = oldFeatures.filter(feature => !newFeatures.includes(String(feature) ) );
                
                // Remove class from feature source list if it's been updated to no longer have that feature
                await FeatureModel.updateMany(
                    {
                        _id: {
                            $in: removedFeatures
                        }
                    },
                    {
                        $pull: {
                            sources: foundClass._id
                        }
                    }
                )
                // Add class to feature source list if it's been updated to have that feature
                await FeatureModel.updateMany(
                    {
                        _id: {
                            $in: addedFeatures
                        }
                    },
                    {
                        $addToSet: {
                            sources: foundClass._id
                        }
                    }
                )
            }
            // Load class's associated features
            const classFeatures = await FeatureModel
            .find({
                _id: {
                    $in: newClass.features()
                }
            });
            res
            .status(200)
            .json({
                success: true,
                subclass: newClass,
                features: classFeatures
            });
        } catch(e) {
            res
            .status(400)
            .json({
                success: false,
                error: e.message
            })
        }
    },
    delete: async (req, res) => {
        try {
            const deletedClass = await SubclassModel.findOneAndDelete({_id: req.params.subclassId});
            await FeatureModel.updateMany(
                {
                    _id: {
                        $in: deletedClass.features()
                    }
                },
                {
                    $pull: {
                        sources: deletedClass._id
                    }
                }
            );
            res
            .status(200)
            .json({
                success: true,
                subclass: deletedClass
            });
        } catch (e) {
            res
            .status(400)
            .json({
                success: false,
                error: e.message
            });
        }
    },
    show: async (req, res) => {
        const foundClass = await SubclassModel.findById(req.params.classId);
        const foundFeatures = await FeatureModel.find({source: foundClass._id});
        res
        .status(200)
        .json({
            subclass: foundClass,
            features: foundFeatures
        });
    }
}

module.exports = SubclassController;

function subclassParams(params) {
    const validParams = {name, description, dndClass, spellcasting, levelFeatures} = params;
    return validParams;
}