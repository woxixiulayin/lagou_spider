var $inputJob = $("#input_job"),
    $cityBar = $("#city_bar");

$inputJob.click(function(event) {
    if (event.keyCode != 13) return;
    showResult();
});

$("#submit").click(function() {
    showResult();
});

//先影藏cityBar，然后设置city sapn
$cityBar.hide();
search_cities.forEach(function(city, index) {
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

    //removespan的click动作
    $removespan.addClass("remove_span")
        .click(function() {
            $(this).parent().hide(400, function() {
                //删除dom元素和对应的search_cities中的数据
                search_cities.splice(index, 1);
                $(this).remove();
            })
        })
        .hide();

    $sapncity.append($removespan);
    $cityBar.append($sapncity);
});

var $addcity = $("<span></span>");
$addcity.addClass("add_span");
$cityBar.append($addcity);
//cityBar 结束

//add_span点击事件
$(".add_span").click(function () {
    //创建input并获得焦点
    var $city_input = $("<input>");
    $city_input
        .addClass("city_input")
        .hide()
        .blur(function() {
            
        });
    $(this).before($city_input);
    $city_input.show(400).focus();


});

//inputJob获得焦点是显示cityBar
$inputJob.focus(function(event) {
    $cityBar.slideDown(500);
});


//点击图示区影藏cityBar
$("#wrap").click(function() {
    $cityBar.slideUp(500);
});