#!/usr/bin/env node
var express = require("express");
var app = express();

app.use("/static", express.static("static"));
app.use(require('body-parser').urlencoded({extended: true}));//为了获得post数据

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/templates/index.html");
});

app.post("/", function (req, res) {
    var job = req.body.job;
});
app.listen('8080');