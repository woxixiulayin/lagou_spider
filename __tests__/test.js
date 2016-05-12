jest.unmock('../spider');
jest.unmock('request');

var spider = require('../spider');

describe('check funciton in spider.js', () => {
    var url1 = "http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF";
    var getHtml = spider.getHtml;
    pit('check getHtml', () => {
        return getHtml(url1).then((body) => {
            var result = JSON.parse(body);
            expect(result).toBeDefined();
            expect(result.success).toBe(true);
        });
    });
});