const { Model } = require('mongoose');
const DndClassModel = require('../models/DndClass');
const FeatureModel = require('../models/Feature');
const SubclassModel = require('../models/Subclass');

const DndClassController = {
    index: async (req, res) => {
        const allClasses = await DndClassModel.find({});
        const classFeatures = await FeatureModel.find({sourceModel: 'DndClass'});
        res
        .status(200)
        .json({
            success: true,
            classes: allClasses,
            features: classFeatures
        });
    },
    create: async (req, res) => {
        try {
            const params = classParams(req.body);
            const newClass = await DndClass.create(params);
            await FeatureModel.updateMany(
                {
                    _id: {
                        $in: newClass.features()
                    }
                },
                {
                    $addToSet: {
                        sources: newClass._id
                    }
                }
            );
            const classFeatures = await FeatureModel
            .find({
                _id: {
                    $in: newClass.features()
                }
            });
            res
            .status(201)
            .json({
                success: true,
                dndClass: newClass,
                features: classFeatures
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
            const params = classParams(req.body);
            const foundClass = await DndClassModel.findById(req.params.classId);
            await foundClass.update(params);
            const newClass = await DndClassModel.findById(req.params.classId);

            // Cascade updates to features added/removed in update
            if ("levelFeatures" in params) {
                // Generate list of features added & removed in update
                const oldFeatures = foundClass.features();
                const newFeatures = newClass.features();
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
                dndClass: newClass,
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
            const deletedClass = await DndClassModel.findOneAndDelete({_id: req.params.classId});
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
                dndClass: deletedClass
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
        const foundClass = await DndClassModel.findById(req.params.classId);
        const foundFeatures = await FeatureModel.find({source: foundClass._id});
        res
        .status(200)
        .json({
            dndClass: foundClass,
            features: foundFeatures
        });
    }
}

module.exports = DndClassController;

function classParams(params) {
    const validParams = {name, description, hitDie, armor, weapons, tools, saves, skills, equipment, spellcasting, tableCols, levelFeatures, subclassFeatureLevels} = params;
    return validParams;
}