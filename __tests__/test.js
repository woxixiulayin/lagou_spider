jest.unmock('../spider');
jest.unmock('request');

var spider = require('../spider');

describe('check funciton in spider.js', () => {
    var url1 = "http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF";
    var getHtml = spider.getHtml;
    getHtml(url1).then((info) => {
            console.log(info);
        });
    // it('check getHtml', () => {
    
    // });
});