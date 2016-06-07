#!/usr/bin/env node
var createjds = require("./utils.js").createjds;
var LagouSpider = require("./lagouspider.js").LagouSpider;
var express = require("express");
var app = express();

app.use("/static", express.static("static"));
// app.use(require('body-parser').urlencoded({extended: true}));//为了获得post数据

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/templates/index.html");
});

app.get("/job/:job", function (req, res) {
    var job = req.params.job;
    var jds = createjds(job);
    console.log(jds);
    var lagouspider = new LagouSpider(jds);
    lagouspider.end().then(() => {
        res.send(JSON.stringify(lagouspider.results));
    });
});
app.listen('8080');