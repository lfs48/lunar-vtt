const express = require("express");
const SubclassController = require("../../controllers/subclasses");

const router = express.Router();

// Get index of classes
router.get('/', SubclassController.index);

// Get existing class
router.get('/:subclassId', SubclassController.show);

// Create new class
router.post('/', SubclassController.create);

// Update existing class
router.patch('/:subclassId', SubclassController.update);

// Delete class
router.delete('/:subclassId', SubclassController.delete);

module.exports = router;