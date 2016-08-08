var $inputJob = $("#input_job"),
    $cityBar = $("#city_bar");

$inputJob.click(function(event) {
    if (event.keyCode != 13) return;
    showResult();
});

$("#submit").click(function() {
    showResult();
});

function createCitySpan(city) {
    var $sapncity = $("<span></span>"),
        $removespan = $("<span></span>");

    //cityspan的文本和hover
    $sapncity.text(city)
        .addClass("city_span")
        .hover(function(e) {
            // if($removespan.is(":animated")) return;
            $removespan.stop().show(400);
        }, function(e) {
            // if($removespan.is(":animated")) return;
            $removespan.stop().hide(400);
        });

        if( search_cities.indexOf(city) === -1) {
            search_cities.push(city);
        }
    //removespan的click动作
    $removespan.addClass("remove_span")
        .click(function() {
            var index = search_cities.indexOf(city);
            search_cities.splice(index, 1);
            //删除dom元素和对应的search_cities中的数据
            $(this).parent().hide(400, function() {
                $(this).remove();
            })
        })
        .hide();

    $sapncity.append($removespan);
    return $sapncity;
}


//先影藏cityBar，然后设置city sapn
$cityBar.hide();
search_cities.forEach(function(city, index) {
    var $sapncity = createCitySpan(city);
    $cityBar.append($sapncity);
});


//添加城市按钮的事件
var $addcity = $("<span></span>");
$addcity.addClass("add_span");
$cityBar.append($addcity);

//创建input并获得焦点
var $city_input = $("<input>");
$city_input
    .addClass("city_input")
    .hide()
    .blur(function() {
        var city = this.value.toLowerCase();
        if (city != "" && search_cities.indexOf(city) === -1 && /[\u4e00-\u9fa5].*/.test(city)) {
            $sapncity = createCitySpan(city);
            $addcity.before($sapncity)
                .hide()
                .show(400);
        }
        this.value = "";
        $cityBar.find("input").hide(400);
        return false;
    });
//input enter事件
$city_input.bind("keydown", function(e) {
     var e = event || window.event;       
            if(e && e.keyCode==13){ // enter 键
                $city_input.blur();
            }
});
$addcity.after($city_input);


//add_span点击事件
$(".add_span").click(function() {
    $city_input.show(400).focus();
});

//inputJob获得焦点时候显示cityBar
$inputJob.focus(function(event) {
    $cityBar.slideDown(500);
});


//点击图示区影藏cityBar
$("#wrap").click(function() {
    $cityBar.slideUp(500);
});