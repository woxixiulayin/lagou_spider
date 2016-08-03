function $(selectors) {
    return document.querySelector(selectors);
}

function CityJobcount(city, jobcount) {
    this.city = city;
    this.jobcount = jobcount;
};

var getJSON = function(url) {
    var promise = new Promise(function(resolve, reject) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = ActiveXObject("MicrosoftAjax");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                resolve(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    });
    return promise;
}

var inputjob = $("#input_job");
var jobinfotable = $("#jobinfotable");
var submit = $("#submit");
var myChart = echarts.init($('#chart'));

function getCityJobcounts() {
    var cityjobcounts = [];
    var job = inputjob.value;
    var url = '/job/' + job;
    return getJSON(url);
}

function diplapyJobinfo(cityjobcounts) {
    var job_name = inputjob.value,
        cities = [],
        cityjob_chart = [];

    cityjobcounts.forEach( function(element, index) {
        cities.push(element.city);
        cityjob_chart.push(
                   {
                        value: element.jobcount,
                        name: element.city
                   });
    });
    console.log(cityjob_chart);
    // 指定图表的配置项和数据
//     var option = {
//     title : {
//         text: '拉勾网' + job_name + '工作分布',
//         x:'center'
//     },
//     tooltip : {
//         trigger: 'item',
//         formatter: "{a} <br/>{b} : {c} ({d}%)"
//     },
//     legend: {
//         orient: 'horizontal',
//         left: 'left',
//         top: "10px";
//         data: cities
//     },
//     series : [
//         {
//             name: '拉勾网',
//             type: 'pie',
//             radius : '55%',
//             center: ['50%', '60%'],
//             data: cityjob_chart,
//             itemStyle: {
//                 emphasis: {
//                     shadowBlur: 10,
//                     shadowOffsetX: 0,
//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
//                 }
//             }
//         }
//     ]
// };
option = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        left: 'center',
        top: "55px",
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
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
        diplapyJobinfo([]);
    getCityJobcounts().then((res) => {
        var cityjobcounts = JSON.parse(res);
    });
}