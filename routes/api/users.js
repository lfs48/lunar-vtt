const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

// Register new user
router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
    .then( (user) => {
        if (user) {
            return res.status(400).json({username: "A user has already registered with this username"})
        } else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {throw err;}
                    newUser.password = hash;
                    newUser.save()
                    .then( (user) => {
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
                    })
                    .catch( (err) => console.log(err) );
                })
            });
        }
    });

});

// Log in existing user
router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

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
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
});

module.exports = router;