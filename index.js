const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
require("dotenv").config();


app.get("/", (req, res) => {
    res.send("BD-Travel");
});


app.listen(port, () => {
    console.log(`server is working from ${port}`);
});