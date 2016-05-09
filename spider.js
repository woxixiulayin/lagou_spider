var superagent = require("superagent");


//getHtml 是一个promise，使用promise.then来获得html
var getHtml = function (url) {
    superagent.get(url)
        .end(function(err, pres) {
            var html = pres.text;
            return new Promise(function (resolved, rejcet) {
                resolved(html);
            })
        });
};


module.exports.getHtml = getHtml;