'use strict'
const superagent = require('superagent');
const Jd = require('./model.js').Jd;
const UALIST = [
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 "
    + "(KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1",
    "Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 "
    + "(KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 "
    + "(KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 "
    + "(KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.1 "
    + "(KHTML, like Gecko) Chrome/19.77.34.5 Safari/537.1",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 "
    + "(KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5",
    "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 "
    + "(KHTML, like Gecko) Chrome/19.0.1084.36 Safari/536.5",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1061.1 Safari/536.3",
    "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 "
    + "(KHTML, like Gecko) Chrome/19.0.1061.0 Safari/536.3",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.24 "
    + "(KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24",
    "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.24 "
    + "(KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24"
   ];

//para = {positon: string, cities: [string]}
function Spider(para) {
        this.para = para;
        this.urls = [];
}

Spider.prototype = {
    constructor: Spider,

    //每个url的处理入口
    parseUrl: function (url) {
         return new Promise( (resolve, reject) => {
            superagent
            .get(url)
            .set("User-Agent", UALIST[Math.round(Math.random()*UALIST.length)])
            // .set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36")
            // .set("Accept-Language", "en")
            .end( (err, res) => {
                if (err || !res.ok) {
                    console.log(err);
                    reject(err);
                } else {
                    //后续处理这个url下获取到的info信息
                    let html = res.text,
                        jd = this.getData(html);
                    resolve(jd);
                }
            });
        });
    },

    //制定获取数据的策略
    getData: function (html) {
        let json = JSON.parse(html);
        if(json.success === false) {
            console.log(json);
            return null;
        }
        let positionResult = json.content.positionResult,
            //"全部"对应于总职位数,即没有指明城市时
            city = positionResult.locationInfo.city,
            count = positionResult.totalCount,
            jd = new Jd(city, this.para.position, count);
        return jd;
    },

    //入口函数
    run: function () {
        let para = this.para,
            promises = [],
            that = this;

        //爬取单个城市
        para.cities.forEach( (city, index) => {
            that.urls.push(encodeURI("http://www.lagou.com/jobs/positionAjax.json?kd="+ para.position + "&city=" + city));
        });

        this.urls.forEach( function(url, index) {
            promises.push(that.parseUrl(url));
        });
        return Promise.all(promises);
    }
};


// // 测试
// let spider = new Spider({position:"前端", cities:['杭州', '上海']});
// spider.run().then(jds => {
//     console.log(jds);
// });


exports.Spider = Spider;