function $ (id) {
    return document.getElementById(id);
}

function CityJobcount (city, jobcount) {
    this.city = city;
    this.jobcount = jobcount;
};

function Ajax(req, url, callback) {
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
    xmlhttp.open(req, url, true);
    xmlhttp.send();
}

var getJSON = function(url) {
    var promise = new Promise(function (resolve, reject) {
        var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = ActiveXObject("MicrosoftAjax");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            resolve(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    });
    return promise;
}

// var display = function () {
//     var maxhight = 600;
//     var maxjobcount = 0;
//     function createJobCol(cityjobcount) {//job信息圆柱
//         var div = document.createElement("DIV");
//         div.className = "job-count";
//         div.city = 
//         div.style.height = getJobDivHight(jobcount);

//     };

// };
var inputjob = $("job");
var inputsubmit = $("submit");

function getCityJobcounts() {
    var cityjobcounts = [];
    var job = inputjob.value;
    var url = '/job/'+job;
    console.log(url);
    getJSON(url).then((res) => {
        console.log(res);
    });
}

inputjob.onkeydown = function (event) {
    if(event.target != this || event.keyCode != 13) return;
    console.log(inputjob.value);
    getCityJobcounts();
}
