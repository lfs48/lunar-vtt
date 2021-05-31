const express = require("express");
const Feature = require("../../models/Feature");
const FeatureController = require("../../controllers/features");

const router = express.Router();

router.get('/', FeatureController.index);
router.get('/:featureId', FeatureController.show);
router.post('/', FeatureController.create);
router.patch('/:featureId', FeatureController.update);
router.delete('/:featureId', FeatureController.delete);
module.exports = router;