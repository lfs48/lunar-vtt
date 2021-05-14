const FeatureModel = require('../models/Feature');
const DndClassModel = require('../models/DndClass');

const FeatureController = {
    index: async (req, res) => {
        const allFeatures = await FeatureModel.find({});
        res.json(allFeatures);
    },
    create: async (req, res) => {
        try{
            const params = featureParams(req.body);
            const newFeature = new Feature(params);
            const savedFeature = await newFeature.save();
            params.sources.forEach( async (id) => {
                const source = await getSourceModel(params.sourceModel).findById(id);
                const features = source.features;
                features.push(savedFeature.id);
                await source.updateOne({features: features});
            });
        res.json(savedFeature);
        } catch(e) {
            res.status(400).json({error: e.message})
        }
    },
    update: async (req, res) => {
        try{
            const params = featureParams(req.body);
            const foundFeature = await FeatureModel.findById(req.params.featureId);
            if ("sources" in params) {
                // Remove feature from source feature list if it's been updated to no longer have that source
                foundFeature.sources.forEach( async (id) => {
                    const source = await getSourceModel(foundFeature.sourceModel).findById(id);
                    const features = source.features;
                    if (!params.sources.includes(source.id)) {
                        const i = features.indexOf(req.params.featureId)
                        features.splice(i, 1);
                        await source.updateOne({features: features});
                    }
                });
                // Add feature to source feature list if it's been updated to have that new source
                params.sources.forEach( async (id) => {
                    const source = await getSourceModel(foundFeature.sourceModel).findById(id);
                    const features = source.features;
                    if (!features.includes(req.params.featureId)) {
                        features.push(req.params.featureId);
                        await source.updateOne({features: features});
                    }
                });
            }
            await foundFeature.updateOne(params);
            const newFeature = await FeatureModel.findById(req.params.featureId);
            res.json(newFeature);
        } catch(e) {
            res.status(400).json({error: e.message})
        }
    },
}

module.exports = FeatureController;

function featureParams(params) {
    const validParams = {name, description, featureType, sources, sourceModel, level} = params;
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