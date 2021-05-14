const express = require("express");
const Feature = require("../../models/Feature");
const FeatureController = require("../../controllers/features");

const router = express.Router();

// Create new feature
router.post('/', FeatureController.create);
router.patch('/:featureId', FeatureController.update);
module.exports = router;