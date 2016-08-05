'use strict'
const  koa = require('koa');
var  send = require('koa-send'),
    serve = require('koa-static'),
    body = require('koa-body-parser')(),
    app = koa(),
    router = require('koa-router')(),
    dbUtil = require('./server/dbUtil.js').dbUtil;

app.use(serve((__dirname + "/src")));

router.get('/', function *() {
        yield send(this, "./src/html/index.html");
});


router.post('/search', body, function *(next) {
    console.log(this.request.body);
    let query = this.request.body;
    yield dbUtil.getData(query).then((jds) => {
        this.body = JSON.stringify(jds);
        console.log(this.body);
    });
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8082);