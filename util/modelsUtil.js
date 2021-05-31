DndClass = require("../models/DndClass");
Feature = require("../models/Feature");
Subclass = require("../models/Subclass");

const modelsByName = {
    'DndClass': DndClass,
    'Feature': Feature,
    'Subclass': Subclass
};

function getModelByName(name){
    return modelsByName(name);
}

module.exports = getModelByName;