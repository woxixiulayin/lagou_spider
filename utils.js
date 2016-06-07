var CityJobcount = require("./lagouspider.js").CityJobcount;
var CITIES = ["南京","杭州","北京","上海","广州","深圳","武汉", "苏州"];


function createjds (job) {
    return CITIES.map((item, index, arrar) => {
        return new CityJobcount(item, job);
    })
}


module.exports.createjds = createjds;
module.exports.CITIES = CITIES;