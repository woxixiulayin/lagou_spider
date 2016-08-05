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

var db = mongoose.connect("mongodb://localhost/test").connection;;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});



// //dbdata
// // {   
// //     position: "前端",
// //     citiesInfo: [
// //     { city: '杭州', count: 1256 , changetime: "Fri Aug 05 2016 13:42:07 GMT+0800 (CST)"}，
// //     { city: '上海', count: 2100 , changetime: "Fri Aug 05 2016 13:42:07 GMT+0800 (CST)"}
// //     ]
// // }

// var db = function () {
//     //query = {position:string, cities:[string]}
//     var getData = function(query) {
//         let position = query.position,
//             cities = query.cities,
//             filepath = cwd + "/data/" + position,
//             dbdata = readDBdata(filepath),
//             spiderpara = {position: position};
//         log(filepath);
//         if (dbdata === null) {
//             dbdata = createDBdata(position);
//             log(dbdata);
//         }

//         let promise = new Promise((resolve, reject) => {
//             let spiderquery = getSpiderQuery(dbdata, query);
//             log(spiderquery);
//             getSpiderJds(spiderquery).then( jds => {
//                 writeDBdata(updateDbdata(dbdata, jds));
//                 log("123");
//                 resolve(jds);
//             });
//         });

//         return promise;
//     };

//     var getSpiderJds = function (para) {
//         var spider = new Spider(para);
//         return spider.run();
//     }

//     var readDBdata = function(filepath) {
//         if(!fs.existsSync(filepath)) return null;
//         var data = fs.readFileSync(filepath, "utf8");
//         return JSON.parse(data);
//     }

//     var writeDBdata = function(filepath, data) {
//         if (typeof data === 'string') return false;
//         fs.writeFielSync(filepath, 'utf8', JSON.stringify(data));
//     }

//     var getSpiderQuery = function(dbdata, query){
//         //数据库没有数据则爬取原有的query
//         if (dbdata === null ) return query;

//         let citiesInfo = dbdata.citiesInfo,
//             querycities = query.cities,
//             spiderquery = {
//                 position: query.position,
//                 cities: []
//             };

//         //如果数据太旧或者没有数据，则将需要更新数据的城市放入spiderquery中
//         querycities.forEach((city, index) => {
//             for(let i=0,len=citiesInfo.length; i<len;i++) {
//                 if(citiesInfo[i].city === city) {
//                     if(isOutDate(citiesInfo[i].changetime)) {
//                         spiderquery.cities.push(city);
//                         return ;
//                     }
//                 }
//             }

//             spiderquery.cities.push(city);
//         })

//         return spiderquery;
//     }

//     //跟更新数据库json数据
//     var updateDbdata = function(dbdata, jds) {
//         for (let i=0, len=jds.length; i<len;i++) {
//             let cityinfo = {
//                         city: jds[i].city,
//                         count: jds[i].count,
//                         changetime: String(new Date())
//                     };

//             //更新数据
//             for (let j=0, len=dbdata.citiesInfo.length; j<len;j++) {
//                 if(jds[i].city === dbdata.citiesInfo[j].city) {
//                     dbdata.citiesInfo[j] = cityinfo;
//                     break;
//                 }
//             }
//             //如果不存在该城市，则插入数据
//             if(j === len) {
//                 dbdata.citiesInfo.push(cityinfo);
//             }
//         }

//         return dbdata;
//     }

//     var createDBdata = function(position) {
//         return {
//             position: position,
//             citiesInfo: []
//         }
//     }

//     var isOutDate = function (date) {
//         let nowtime = new Date(),
//             changetime = new Date(date);
//         return nowtime - changetime > timeInt ? true : false;
//     }

//     return {
//         getData: getData
//     }
// }();


//test
// db.getData({ position: '前端', cities: [ '上海', '广州', '杭州' ] }).then(jds=>{
//     log(jds);
// });

exports.db = db;
