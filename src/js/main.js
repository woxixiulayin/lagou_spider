function $(selectors) {
    return document.querySelector(selectors);
}

function CityJobcount(city, jobcount) {
    this.city = city;
    this.jobcount = jobcount;
};

var inputjob = $("#input_job");
var jobinfotable = $("#jobinfotable");
var submit = $("#submit");
var myChart = echarts.init($('#chart'));

function diplapyJobinfo(cityjobcounts) {
    var job_name = inputjob.value,
        cities = [],
        cityjob_chart = [];

    cityjobcounts.forEach(function(element, index) {
        cities.push(element.city);
        cityjob_chart.push({
            value: element.jobcount,
            name: element.city
        });
    });
    console.log(cityjob_chart);

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '拉勾网' + job_name + '工作分布',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            top: "40px",
            data: cities
        },
        series: [{
            name: '拉勾网',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: cityjob_chart,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

inputjob.onkeydown = function(event) {
    if (event.target != this || event.keyCode != 13) return;
    getCityJobcounts().then((res) => {
        var cityjobcounts = JSON.parse(res);
        diplapyJobinfo(cityjobcounts);
    });
}

submit.onclick = function() {
    fetch("/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "firstName=Nikhil&favColor=blue&password=easytoguess"
    }).then(function(res) {
        if (res.ok) {
            alert("Perfect! Your settings are saved.");
        } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
        }
    }, function(e) {
        alert("Error submitting form!");
    });
}