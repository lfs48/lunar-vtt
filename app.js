const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {useNewUrlParser: true})
    .then( () => console.log("MongoDB connected"))
    .catch( (err) => console.log(err) );

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));