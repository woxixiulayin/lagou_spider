jest.unmock('../spider');
jest.unmock('../lagouspider');
jest.unmock('request');

var spider = require('../spider');
var Lagouspider = require('../lagouspider').LagouSpider;
var urlExample = "http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF";

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
    var lagouspider = new Lagouspider({city:"上海",kd:"前端"});
    it('check Lagouspider createurl', () => {
        var jd = {city:"上海",kd:"前端"}
        var url = lagouspider.createUrl(jd);
        expect(url).toBe(urlExample);
        });
});