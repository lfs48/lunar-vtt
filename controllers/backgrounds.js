const Feature = require('../models/Feature');
const Background = require('../models/Background');

const BackgroundController = {
    index: async (req, res) => {
        try {
            const allBgs = await Background.find({});
            const bgFeatures = await Feature.find({ source: "Background" })
            res
            .status(200)
            .json({
                success: true,
                backgrounds: allBgs,
                features: bgFeatures
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
            const foundBg = await Background.findById(req.params.bgId);
            const bgFeatures = await Feature.find({source: foundBg._id});
            res
            .status(200)
            .json({
                success: true,
                background: foundBg,
                features: bgFeatures
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
            const params = bgParams(req.body);
            const newBg = await Background.create(params);

            await Feature.updateMany(
                {
                    _id: {
                        $in: newBg.features
                    }
                },
                {
                    $addToSet: {
                        sources: newBg._id
                    }
                }
            )

            const bgFeatures = await Feature.find({source: newBg._id});
            res
            .status(201)
            .json({
                success: true,
                background: newBg,
                features: bgFeatures
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
            const params = bgParams(req.body);
            const foundBg = await Background.findById(req.params.bgId);
            await foundBg.updateOne(params);
            const newBg = await Background.findById(req.params.bgId);

            // Cascade updates to features added/removed in update
            if ("features" in params) {
                // Generate list of features added & removed in update
                const oldFeatures = foundBg.features;
                const newFeatures = newBg.features;
                const addedFeatures = newFeatures.filter(feature => !oldFeatures.includes(String(feature) ) );
                const removedFeatures = oldFeatures.filter(feature => !newFeatures.includes(String(feature) ) );

                // Remove from feature source list if it's been updated to no longer have that feature
                await Feature.updateMany(
                    {
                        _id: {
                            $in: removedFeatures
                        }
                    },
                    {
                        $pull: {
                            sources: foundBg._id
                        }
                    }
                )
                // Add to feature source list if it's been updated to have that feature
                await Feature.updateMany(
                    {
                        _id: {
                            $in: addedFeatures
                        }
                    },
                    {
                        $addToSet: {
                            sources: foundBg._id
                        }
                    }
                )
            }

            const bgFeature = await Feature.find({source: foundBg._id});

            res
            .status(200)
            .json({
                success: true,
                background: newBg,
                features: bgFeature
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
            const deletedBg = await Background.findOneAndDelete({_id: req.params.bgId});
            await Feature.updateMany(
                {
                    _id: {
                        $in: deletedBg.features
                    }
                },
                {
                    $pull: {
                        sources: deletedBg._id
                    }
                }
            );
            res
            .status(200)
            .json({
                success: true,
                background: deletedBg
            });
        } catch (e) {
            res
            .status(400)
            .json({
                success: false,
                error: e.message
            });
        }
    }
}

module.exports = BackgroundController;

function bgParams(params) {
    const validParams = {name, description, features} = params;
    return validParams;
}