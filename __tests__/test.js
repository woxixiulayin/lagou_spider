jest.unmock('../spider');
jest.unmock('../lagouspider');
jest.unmock('request');

var spider = require('../spider');
var Lagouspider = require('../lagouspider').LagouSpider;
var urlExample = "http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF";
var CityJobcount =require('../lagouspider').CityJobcount;
var cities = ["南京","杭州","北京","上海","广州","深圳","武汉"]; 

describe('check funciton in spider.js', () => {
    var getHtml = spider.getHtml;
    pit('check getHtml', () => {
        return getHtml(urlExample).then((body) => {
            var result = JSON.parse(body);
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });
    });
});

describe('check funciton in Lagouspider.js', () => {
    var jds = cities.map((item, index, array) => {
        return new CityJobcount(item, "前端");
    });

    var lagouspider = new Lagouspider(jds);
    pit('check Lagouspider one url', () => {
        var jd = new CityJobcount("上海","前端");
        var url = lagouspider.createUrl(jd);
        expect(url).toBe(urlExample);
        return lagouspider.addUrl(url).then(() => {
            console.log(lagouspider.results);
        });
        });
    pit('check LagouSpider urls', () => {
        lagouspider.results = [];
        return lagouspider.end().then(() => {
            console.log(lagouspider.results);
        });
    });
});
