const express = require("express");
const SubclassController = require("../../controllers/subclasses");

const router = express.Router();

// Get index of classes
router.get('/', SubclassController.index);

// Get existing class
router.get('/:classId', SubclassController.show);

// Create new class
router.post('/', SubclassController.create);

// Update existing class
router.patch('/:classId', SubclassController.update);

// Delete class
router.delete('/:classId', SubclassController.delete);

module.exports = router;