const FeatureModel = require('../models/Feature');
const DndClassModel = require('../models/DndClass');
const { getModelByName } = require('../util/modelsUtil');

const FeatureController = {
    index: async (req, res) => {
        try {
            const allFeatures = await FeatureModel.find({});
            res
            .status(200)
            .json({
                success: true,
                features: allFeatures
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
    show: async (req, res) => {
        try {
            const foundFeature = await FeatureModel.findById(params.featureId);
            res
            .status(200)
            .json({
                success: true,
                feature: foundFeature
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
    create: async (req, res) => {
        try{
            const params = featureParams(req.body);
            const newFeature = await Feature.create(params);
        res
        .status(201)
        .json({
            success: true,
            feature: newFeature
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
    update: async (req, res) => {
        try{
            const params = featureParams(req.body);
            const foundFeature = await FeatureModel.findById(req.params.featureId);
            await foundFeature.updateOne(params);
            const newFeature = await FeatureModel.findById(req.params.featureId);
            res
            .status(200)
            .json({
                success: true,
                feature: newFeature
            });
        } catch(e) {
            res
            .status(400)
            .json({
                success: false,
                error: e.message
            })
        }
    }
}

module.exports = FeatureController;

function featureParams(params) {
    const validParams = {name, description, featureType, sourceModel, level} = params;
    return validParams;
}

function getSourceModel(source) {
    switch(source) {
        case('DndClass'):
            return DndClassModel;
        default:
            return null;
    }
}