var MQ = (function () {
    var singlemq = {};

    function Mq() {
        this.q = [];//消息数组
        this.listerners = [];//监听者数组
    }

    Mq.prototype.push = function(msg){
        this.q.push(msg);
        this.notify();
    };

    //将消息分发给对应的监听者
    Mq.prototype.notify = function (){
        for(var i=0,len=this.listerners.length;i<len;i++) {
            var msg = this.q.shift();   //取出消息
            var listener = this.listerners[i];
            if (msg.type == listerner.listentype) { //根据消息种类来匹配监听者
                listerner.handle(msg);
                break;  //找到监听者后，就不需要再寻找下一个
            }
        }
    };

    Mq.prototype.registListener = function (listener) {
        this.listerners.push(listerner);
    };
    Mq.prototype.unregistListener = function (listerner) {
        this.listerners.forEach(function(lis, index) {
            if (lis == listerner) {
                this.listerners.splice(index, 1);
            }
        })
    }

    mq = new Mq();

    return singlemq;
}());

function Msg (msg) {
    this.type= this.constructor.name; //获得Msg的类型，即构造函数名
    this.msg = msg;
}

function Jobdesc (city, job) {
    Msg.call(this, {"city":city, "job":job});
}
function Requestdata (data) {
    Msg.call(this, data);
}
function Cityjobdata (city, job, data) {
    Msg.call(this, {"city":city,"job":job,"data":data});
}

function Listener (msgConstructor) {
    this.listentype = msgConstructor.name;
}

Listener.prototype.handle = function (msg) {
    console.log('nothing');
}

var spider = new Listener(Jobdesc);
spider.handle = function(msg) {
    if (!(msg instanceof Jobdesc)) return;
    var url = this.createUrl(msg);
    this.fetchData(url);
};
spider.createUrl = function (msg) {
    var url = "http://www.lagou.com/jobs/positionAjax.json?city="+msg.city+"&kd"+ msg.job;
    return url;
}
spider.fetchData = function (url) {
    Ajax("POST", url, true, function(responsetext) {
        var requestdata = responsetext;
        MQ.push(requestdata);
    });
}

spider.fetchData("http://www.lagou.com/jobs/positionAjax.json?city=%E4%B8%8A%E6%B5%B7&kd=%E5%89%8D%E7%AB%AF&pn=133");