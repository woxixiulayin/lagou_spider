'use strict'
const superagent = require('superagent');
const Jd = require('./model.js').Jd;

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
            superagent.get(url)
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
        let positionResult = JSON.parse(html).content.positionResult,
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


//测试
// let spider = new Spider({position:"前端", cityies:['杭州']});
// spider.run().then(jds => {
//     console.log(jds);
// });


exports.Spider = Spider;