#!/usr/bin/env node
var express = require("express");
var app = express();

app.use("/static", express.static("static"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/templates/index.html");
})

app.listen('8080');