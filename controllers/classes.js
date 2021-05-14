const { Model } = require('mongoose');
const DndClassModel = require('../models/DndClass');
const FeatureModel = require('../models/Feature');

const DndClassController = {
    index: async (req, res) => {
        const allClasses = await DndClassModel.find({})
        const classFeatures = await Feature.find({sourceModel: 'DndClass'})
        res
        .status(200)
        .json({
            success: true,
            classes: allClasses,
            features: classFeatures
        });
    },
    create: async (req, res) => {
        const newClass = new DndClass(classParams(req.body));
        const savedClass = await newClass.save();
        res.json(savedClass);
    },
    update: async (req, res) => {
        const params = classParams(req.body);
        const foundClass = await DndClassModel.findById(req.params.classId);
        if ("features" in params) {
            // Remove class from feature source list if it's been updated to no longer have that feature
            foundClass.features.forEach( async (id) => {
                const feature = await FeatureModel.findById(id);
                const sources = feature.sources;
                if (!feature.sources.includes(feature.id)) {
                    const i = sources.indexOf(req.params.classId)
                    sources.splice(i, 1);
                    await feature.updateOne({sources: sources});
                }
            });
            // Add class to feature source list if it's been updated to have that feature
            params.features.forEach( async (id) => {
                const feature = await FeatureModel.findById(id);
                const sources = feature.sources;
                if (!features.includes(req.params.featureId)) {
                    features.push(req.params.featureId);
                    await source.updateOne({features: features});
                }
            });
        }
        await foundClass.update(classParams(req.body));
        const newClass = await DndClassModel.findById(req.params.classId);
        res.json(newClass);
    },
    delete: async (req, res) => {
        try {
            const deletedClass = await DndClassModel.findOneAndDelete({_id: req.params.classId});
            res
            .status(200)
            .json({
                success: true,
                data: deletedClass
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
    getClassFeatures: async (req, res) => {
        const foundClass = await DndClassModel.findById(req.params.classId).populate("features");
        res.json(foundClass);
    }
}

module.exports = DndClassController;

function classParams(params) {
    const validParams = {name, description, hitDie, armor, weapons, tools, saves, skills, equipment, tableCols, features} = params;
    return validParams;
}