const express = require("express");
const RaceController = require("../../controllers/races");

const router = express.Router();

// Get index of races
router.get('/', RaceController.index);

// Get existing race
router.get('/:raceId', RaceController.show);

// Create new race
router.post('/', RaceController.create);

// Update existing race
router.patch('/:raceId', RaceController.update);

// Delete race
router.delete('/:raceId', RaceController.delete);

module.exports = router;