'use strict'
const  koa = require('koa');
var  send = require('koa-send'),
    serve = require('koa-static'),
    body = require('koa-body-parser')(),
    app = koa(),
    router = require('koa-router')(),
    Spider = require('./server/spider.js').Spider;

app.use(serve((__dirname + "/src")));

router.get('/', function *() {
        yield send(this, "./src/html/index.html");
});


router.post('/search', body, function *(next) {
    let spider = new Spider(this.request.body);
    yield spider.run().then((posts) => {
        let data = [];
        posts.forEach((ele, index) => {
            data = data.concat(ele);
        });
        this.body = JSON.stringify(data);
    });
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8082);