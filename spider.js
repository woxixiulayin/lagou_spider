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

var Spider = {};
Spider.urls = [];
Spider.workers = [];//成员是promise变量，异步获取html
Spider.results = [];//存放爬取结果
Spider.addUrl = function (url) {
    this.urls.push(url);
    var worker = this.creatWorker(url);
    this.workers.push(worker.then(that.actAftGetHtml));
};
Spider.creatWorker = function (url) {//返回promise实例,可以复写该函数定制自己的处理规则
    var worker = getHtml(url);
    var that = this;
    worker.then((html)=>{
        var result = JSON.parse(html);
        that.results.push(result);
    })
    return worker;
};


var url1 = "http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF";

getHtml(url1).then((info) => {
    console.log(info);
});

module.exports.getHtml = getHtml;