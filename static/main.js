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
var jobinfotable = $("jobinfotable");

function getCityJobcounts() {
    var cityjobcounts = [];
    var job = inputjob.value;
    var url = '/job/'+job;
    return getJSON(url);
}

function diplapyJobinfo(cityjobcounts) {
    jobinfotable.removeAttribute("hidden");
    jobinfotable.innerHTML = "";
    cityjobcounts.forEach((item, index, array) => {
        var tr = document.createElement("tr");
        var tdcity = document.createElement("td");
        var tdcounts = document.createElement("td");
        tdcity.innerHTML = item.city;
        tdcounts.innerHTML = item.jobcount;
        tr.appendChild(tdcity);
        tr.appendChild(tdcounts);
        jobinfotable.appendChild(tr);
    });
}

inputjob.onkeydown = function (event) {
    if(event.target != this || event.keyCode != 13) return;
    getCityJobcounts().then((res) => {
        var cityjobcounts = JSON.parse(res);
        diplapyJobinfo(cityjobcounts);    
    });
}
