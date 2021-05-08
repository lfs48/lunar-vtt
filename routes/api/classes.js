const express = require("express");
const DndClass = require('../../models/DndClass');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const router = express.Router();

// Register new user
router.get('/:classId', (req, res) => {

    DndClass.findOne({ id: req.params.classId })
    .then( (dndClass) => {
        if (dndClass) {
            return res.status(200).json(dndClass);
        } else {
            return res.status(404).json({error: "No such class"});
        }
    });
});

// Log in existing user
router.post('/login', (req, res) => {

    // const {errors, isValid} = validateLoginInput(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    const {name, description, hitDie, armor, weapons, tools, saves, skills, equipment, tableCols, classTable} = req.body;

    User.findOne({username})
    .then( (user) => {
        if (!user) { return res.status(404).json({error: "Incorrect username or password"}); }
        bcrypt.compare(password, user.password)
        .then( (isMatch) => {
            if (isMatch) {
                const payload = {id: user.id, username: user.username};
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 86400},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                return res.status(400).json({error: "Incorrect username or password"});
            }
        });
    });
});

// Get current user
router.post('/', (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
});

module.exports = router;