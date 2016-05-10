var request = require('request');

var headers = {
            'Accept': '*/*',
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Cookie': 'ASP.NET_SessionId=zikhfrrprfylac454hgu342u',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36',
            'X-MicrosoftAjax': 'Delta=true'
        }; 
//getHtml 是一个promise，使用promise.then来获得html
var getHtml = function(url) {
    var options = {
        url: url,
        headers: headers
    };

    var promise = new Promise(function(resolved, reject) {
        var reqCallback = function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolved(body);
            } else {
                console.log(error || response.statusCode);
            }
        }
        request(options, reqCallback);
    });
    return promise;
};

function Spider (jds, workpromise) {
    this.urls = [];
    this.workerpromises = [];
    this.jds = jds;
    this.workpromise = workpromise;
};

Spider.prototype.creatUrl = function (jd) {

}

Spider.prototype.end = function(callback){
    return Promise.all(this.workerpromises).then(callback(results));
};


var url1 = "http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF";

getHtml(url1).then((info) => {
    console.log(info);
});

module.exports.getHtml = getHtml;