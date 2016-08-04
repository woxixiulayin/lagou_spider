#!/usr/bin/env node

var express = require("express");
var app = express();
var port = "8082";

app.use("/static", express.static("front"));

app.get("/", function (req, res) {
    console.log("new request");
    res.sendFile(__dirname + "/front/html/index.html");
});

app.post("/search", function (req, res) {
    console.log("new post request");
    console.log(req.params);
});

app.listen(port);
console.log("server running at port " + port);