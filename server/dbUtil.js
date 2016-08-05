'use strict'
const fs = require('fs'),
    Spider = require('./spider.js').Spider,
    timeInt = 60*60*24,
    mongoose = require('mongoose'),
    TAG = "dataUtil";

function log(object) {
    console.log(TAG);
    console.log(object);
    console.log('----------------------');
}

var db = mongoose.connect("mongodb://localhost/test").connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("data open");
});

var Schema = mongoose.Schema;

var jdSchema = new Schema ({
    position: String,
    changeTime: Date,
    city: String,
    count: Number
});

var Jd = mongoose.model('Jd', jdSchema);

var dbUtil = function () {

    function getData(query) {
        let position = query.position,
            cities = query.cities,
            promises = [];

        //用promise封装每个城市的数据查找，并保存到数组中
        promises = cities.map((city, index, promises) => {
            //mongodb查询是异步的，使用promise
            return  new Promise((resolve, reject) => {
                Jd.findOne({position: position, city: city}, (err, dbjd) => {
                if(err) return handleError(err);
                if (dbjd === null ) {
                    //如果不存在则爬取数据并保存
                    getOneSpiderJd(position, city).then(dbjd => {
                        dbjd.save();
                        log("save data");
                        log(dbjd);
                        resolve(dbjd);
                    });
                } else if (isOutDate(dbjd.changetime)) {
                    //如果数据太旧，则更新数据
                    getOneSpiderJd(position, city).then(dbjd => {
                        Jd.update({position: position, city: city}, {$set: {count: dbjd.count, changetime: new Date()}}, (err, dbjd)=>{
                        if(err) throw err;
                            log("update data");
                            log(dbjd);
                        });
                        resolve(dbjd);
                    })
                } else {
                    log(dbjd);
                    resolve(dbjd);
                }
                });
            });
        });

        //返回promise数组
        return Promise.all(promises);
    };

    function getSpiderJds(para) {
        var spider = new Spider(para);
        return spider.run();
    };

    function spiderDd2dbJd(spiderjd) {
    if(spiderjd === null) return null;
        let jd = new Jd({
            position: spiderjd.position,
            city: spiderjd.city,
            count: spiderjd.count,
            changetime: new Date()
        });
        return jd;
}
    function getOneSpiderJd(position, city) {
        return getSpiderJds({position: position, cities: [city]})
                    .then(spiderjds => {
                        if (spiderjds.length === 0) return null;
                        let dbjd = spiderDd2dbJd(spiderjds[0]); //只有一个元素
                        return dbjd;
                    });
    };
    function isOutDate(date) {
        let nowtime = new Date(),
            changetime = new Date(date);
        return nowtime - changetime > timeInt ? true : false;
    }
    return {
        getData: getData
    }
}();

// test
// let data = dbUtil.getData({ position: '前端', cities: [ '南京', '广州', '杭州' ] }).then(jds=>{
//     console.log(jds);
// });

exports.dbUtil = dbUtil;
