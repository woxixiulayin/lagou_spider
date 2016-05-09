jest.unmock('../spider');

var spider = require('../spider');

describe('check funciton in spider.js', () => {
    var url1 = "http://www.lagou.com/jobs/positionAjax.json?city=上海&kd=前端";
    var getHtml = spider.getHtml;
    getHtml(url1).then((info) => {
            console.log(info);
        });
    it('check getHtml', () => {
        
    });
});