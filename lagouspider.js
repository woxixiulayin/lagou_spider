var Spider = require('./spider').Spider;


function CityJobcount (city, jobcount) {
    this.city = city;
    this.jobcount = jobcount;
};

function LagouSpider (jds) {
    Spider.call(this);
    this.jds = jds;
    this.results = [];//返回最终取到的结果
    this.workers = [];
    this.setWorker(this.getJdinfo);
}
LagouSpider.prototype = Object.create(Spider.prototype);
LagouSpider.prototype.constructor = LagouSpider;
LagouSpider.prototype.createUrl = function(jd){
    var urlOrigin = "http://www.lagou.com/jobs/positionAjax.json?city="+jd.city+"&kd="+jd.kd;
    var url = encodeURI(urlOrigin);
    return url;
};
LagouSpider.prototype.createUrls = function (jds) {
    if(!(jds instanceof Array)) return [];
    var that = this;
    var urls = jds.map((jd) => {//生产所有的url
        return that.createUrl(jd);
    });
}
LagouSpider.prototype.getJdinfo = function (body) {
    var that = this;
    var worker = new Promise(function(resolved, reject) {
        var cityinfo = JSON.parse(body);
        var city = cityinfo.content.positionResult.locationInfo.city;
        var jobcount = cityinfo.content.positionResult.totalCount;
        var cityjobcount = new CityJobcount(city, jobcount);
        that.results.push(cityjobcount);
        resolved(cityjobcount);
    });
    this.workers.push(worker);
    return worker;
}

LagouSpider.prototype.end = function (callback) {//callback(results)
    var promises = this.workers;
    var that = this;
    this.createUrls.forEach(function(url, index) {
        that.addUrl(url);//处理所有的url
    });
    return promises.all(callback);//等待所有的url结束
}

module.exports.LagouSpider = LagouSpider;