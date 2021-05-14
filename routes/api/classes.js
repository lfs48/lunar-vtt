const express = require("express");
const DndClassController = require("../../controllers/classes");
const DndClass = require('../../models/DndClass');

const router = express.Router();

// Get index of classes
router.get('/', DndClassController.index);

// Get existing class
router.get('/:classId', (req, res) => {

    DndClass.findById(req.params.classId)
    .then( (dndClass) => {
        if (dndClass) {
            return res.status(200).json(dndClass);
        } else {
            return res.status(404).json({error: "No such class"});
        }
    });
});

// Create new class
router.post('/', DndClassController.create);

// Update existing class
router.patch('/:classId', DndClassController.update);

// Delete class
router.delete('/:classId', DndClassController.delete);

module.exports = router;