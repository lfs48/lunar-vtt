const FeatureModel = require('../models/Feature');
const RaceModel = require('../models/Race');

const RaceController = {
    index: async (req, res) => {
        try {
            const allRaces = await RaceModel.find({});
            const raceFeatures = await FeatureModel.find({ source: "Race" })
            res
            .status(200)
            .json({
                success: true,
                races: allRaces,
                features: raceFeatures
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
            const foundRace = await RaceModel.findById(req.params.raceId);
            const raceFeatures = await FeatureModel.find({source: foundRace._id});
            res
            .status(200)
            .json({
                success: true,
                race: foundRace,
                features: raceFeatures
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
            const params = raceParams(req.body);
            const newRace = await RaceModel.create(params);

            await FeatureModel.updateMany(
                {
                    _id: {
                        $in: newRace.features
                    }
                },
                {
                    $addToSet: {
                        sources: newRace._id
                    }
                }
            )

            const raceFeatures = await FeatureModel.find({source: newRace._id});
            res
            .status(201)
            .json({
                success: true,
                race: newRace,
                features: raceFeatures
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
            const params = raceParams(req.body);
            const foundRace = await RaceModel.findById(req.params.raceId);
            await foundRace.updateOne(params);
            const newRace = await RaceModel.findById(req.params.raceId);

            // Cascade updates to features added/removed in update
            if ("features" in params) {
                // Generate list of features added & removed in update
                const oldFeatures = foundRace.features;
                const newFeatures = newRace.features;
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
                            sources: foundRace._id
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
                            sources: foundRace._id
                        }
                    }
                )
            }

            const raceFeatures = await FeatureModel.find({source: foundRace._id});

            res
            .status(200)
            .json({
                success: true,
                race: newRace,
                features: raceFeatures
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
            const deletedRace = await RaceModel.findOneAndDelete({_id: req.params.raceId});
            await FeatureModel.updateMany(
                {
                    _id: {
                        $in: deletedRace.features
                    }
                },
                {
                    $pull: {
                        sources: deletedRace._id
                    }
                }
            );
            res
            .status(200)
            .json({
                success: true,
                race: deletedRace
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

module.exports = RaceController;

function raceParams(params) {
    const validParams = {name, description, size, speed, features} = params;
    return validParams;
}