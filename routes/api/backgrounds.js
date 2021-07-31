const express = require("express");
const BackgroundController = require("../../controllers/backgrounds");

const router = express.Router();

// Get index of backgrounds
router.get('/', BackgroundController.index);

// Get existing background
router.get('/:bgId', BackgroundController.show);

// Create new background
router.post('/', BackgroundController.create);

// Update existing background
router.patch('/:bgId', BackgroundController.update);

// Delete background
router.delete('/:bgId', BackgroundController.delete);

module.exports = router;