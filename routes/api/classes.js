const express = require("express");
const DndClassController = require("../../controllers/classes");
const DndClass = require('../../models/DndClass');

const router = express.Router();

// Get index of classes
router.get('/', DndClassController.index);

// Get existing class
router.get('/:classId', DndClassController.show);

// Create new class
router.post('/', DndClassController.create);

// Update existing class
router.patch('/:classId', DndClassController.update);

// Delete class
router.delete('/:classId', DndClassController.delete);

module.exports = router;