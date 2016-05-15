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

var cities = ["全国","北京","上海","广州","深圳","武汉"];

inputjob = $('inputjob');

inputjob.onkeydown = function (event) {
    if(event.target != this || event.keyCode != 13) return;
    console.log(inputjob.value);
    var jds = createjds(inputjob.value);
    console.log(jds);
}
