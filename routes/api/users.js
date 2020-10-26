const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/Users');

router.post('/register', (req, res) => {
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
                    .then( (user) => res.json(user) )
                    .catch( (err) => console.log(err) );
                })
            });
        }
    });

});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username})
    .then( (user) => {
        if (!user) { return res.status(404).json({error: "Incorrect username or password"}); }
        bcrypt.compare(password, user.password)
        .then( (isMatch) => {
            if (isMatch) {
                res.json({msg: "Login success"});
            } else {
                return res.status(400).json({error: "Incorrect username or password"});
            }
        });
    });
});

module.exports = router;