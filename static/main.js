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

var display = {
    var maxhight = 600;
    var maxhobcount;
    function createJobDiv(jobcount) {//job信息div圆柱
        var div = document.createElement("DIV");
        div.className = "job-count";
        div.style.height = getJobDivHight(jobcount);

    };

};
var cities = ["全国","北京","上海","广州","深圳","武汉"]; 
 
 var TEST_JONDATA = {job: "前端",
                data:[
                {city:"全国",jobcount:},
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
