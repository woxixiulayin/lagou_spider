function $ (id) {
    return document.getElementById(id);
}

function CityJobcount (city, jobcount) {
    this.city = city;
    this.jobcount = jobcount;
};

function createjds (job) {
    return cities.map((item, index, arrar) => {
        return new CityJobcount(item, job);
    })
}

function Ajax(req, url, isasync, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = ActiveXObject("MicrosoftAjax");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    };
    xmlhttp.open(req, url, isasync);
    xmlhttp.send();
}

var display = function () {
    var maxhight = 600;
    var maxjobcount = 0;
    function createJobCol(cityjobcount) {//job信息圆柱
        var div = document.createElement("DIV");
        div.className = "job-count";
        div.city = 
        div.style.height = getJobDivHight(jobcount);

    };

};
var cities = ["全国","北京","上海","广州","深圳","武汉"]; 
 
 var TEST_JONDATA = {job: "前端",
                data:[
                {city:"全国",jobcount:12546},
                {city:"北京",jobcount:3456},
                {city:"上海",jobcount:3090},
                {city:"广州",jobcount:2000},
                {city:"深圳",jobcount:2500},
                {city:"武汉",jobcount:1500},
                ]};

inputjob = $('inputjob');

inputjob.onkeydown = function (event) {
    if(event.target != this || event.keyCode != 13) return;
    console.log(inputjob.value);
    var jds = createjds(inputjob.value);
    console.log(jds);
}
