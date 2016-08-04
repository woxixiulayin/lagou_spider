var $inputJob = $("#input_job"),
    $cityBar = $("#city_bar");

$inputJob.click(function(event) {
    if (event.keyCode != 13) return;
    showResult();
});

$("#submit").click(function() {
    showResult();
});

$cityBar.hide();
//input获得焦点时显示显示cityBar
$inputJob.focus(function(event) {
    $cityBar.empty();
    search_cities.forEach(function(city, index) {
        var $sapncity = $("<span></span>"),
            $removespan = $("<span></span>");

        $sapncity.text(city);
        $sapncity.addClass("city_span");

        $removespan.addClass("remove_span");
        $sapncity.append($removespan);

        $cityBar.append($sapncity);
    });
    var $addcity = $("<span></span>");
    $addcity.addClass("add_span");
    $cityBar.append($addcity);
    $cityBar.slideDown(500);
});