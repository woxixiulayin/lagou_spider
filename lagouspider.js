var Spider = require('./spider').Spider;

function LagouSpider (jds) {
    Spider.call(this);
    this.jds = jds;
}
LagouSpider.prototype = Object.create(Spider.prototype);
LagouSpider.prototype.constructor = LagouSpider;
LagouSpider.prototype.createUrl = function(jd){
    var urlOrigin = "http://www.lagou.com/jobs/positionAjax.json?city="+jd.city+"&kd="+jd.kd;
    var url = encodeURI(urlOrigin);
    return url;
};

module.exports.LagouSpider = LagouSpider;