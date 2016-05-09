jest.unmock('../spider');

var spider = require('../spider');

describe('funciton in spider.js', () => {
    var url1 = "http://www.lagou.com/jobs/positionAjax.json?city=上海&kd=前端";
    it('check getHtml', () => {
        getHtml(url1).then((html) => {
            console.log(html);
        });
    });
});