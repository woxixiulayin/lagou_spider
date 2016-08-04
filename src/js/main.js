var search_cities = ["北京", "上海", "广州", "深圳", "杭州"];

function diplapyJobinfo(jds) {
    var myChart = echarts.init(document.getElementById("chart"));
    var position = $("#inputjob").text(),
        cities = [],
        jd_chart = [];

    jds.forEach(function(jd, index) {
        cities.push(jd.city);
        jd_chart.push({
            value: jd.count,
            name: jd.city
        });
    });

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '拉勾网' + position + '工作分布',
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
            data: jd_chart,
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


function getInputdata () {
    return {
        position: document.getElementById("input_job").innerHtml,
        cities: search_cities
    }
};

function fetchJds(inputdata) {
    console.log("inputdata: " + JSON.stringify(inputdata));
    return fetch("/search", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputdata)
    }).then(function(res) {
        if (res.ok) {
            console.log("get data");
            return res.json();
        } 
    }, function(e) {
        console.log(e);
    });
}

function showResult() {
    fetchJds(getInputdata()).then(function (data) {
        console.log(data);
        diplapyJobinfo(data);
        $("#city_bar").slideUp(500);
    })
}
