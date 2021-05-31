const FeatureModel = require('../models/Feature');
const DndClassModel = require('../models/DndClass');
const getModelByName = require('../util/modelsUtil');

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
    },
    delete: async (req, res) => {
        try {
            const deletedFeature = await Feature.findOneAndDelete({_id: req.params.featureId});
            const sourceModel = getModelByName(deletedFeature.sourceModel);
            if (deletedFeature.sourceModel === 'DndClass' || deletedFeature.sourceModel === 'Subclass') {
                deletedFeature.sources.forEach( async (id) => {
                    const source = await sourceModel.findById(id);
                    const newFeatures = {};
                    [...source.features.entries()].forEach( ([level, arr]) => {
                        newFeatures[level] = arr.filter( feature => feature.toString() !== deletedFeature._id.toString() );
                    });
                    console.log(newFeatures);
                    await source.updateOne({features: newFeatures});
                })
            } else {
                await sourceModel.updateMany(
                    {
                        _id: {
                            $in: deletedFeature.sources
                        }
                    },
                    {
                        $pull: {
                            sources: deletedFeature._id
                        }
                    }
                )
            }
            res
            .status(200)
            .json({
                success: true,
                feature: deletedFeature
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