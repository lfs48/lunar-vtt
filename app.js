const express = require("express");
const path = require('path');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const users = require("./routes/api/users");

const app = express();

app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'public/index.html'));
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;
mongoose
.connect(db, {useNewUrlParser: true})
.then( () => console.log("MongoDB connected"))
.catch( (err) => console.log(err) );

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));