$(function() {
    // 加载公共部分
    $("#wrap-head").load("head.html");
    $("#wrap-foot").load("foot.html");
    // 轮播图
    var lis = $("#carousel li"),
        len = lis.length,
        currentIndex = 0,
        nextIndex = 1,
        timer = null,
        html = null;

    for ( var i = 0; i < len; i++) {
        html = "<div></div>";
        $(".points").append(html);
    }

    $(".points").children().eq(0).addClass("curr");
    $(".points").on("click", "div", function() {
        nextIndex = $(this).index();
        move();
    })

    timer = setInterval(move, 5000);

    $("#banner").mouseenter(function() {
        clearInterval(timer);
    })
    $("#banner").mouseleave(function() {
        tiemr = setInterval(move, 5000);
    })

    function move() {
        $(lis[currentIndex]).fadeOut(400);
        $(lis[nextIndex]).fadeIn(400);

        $(".points div").eq(currentIndex).removeClass("curr");
        $(".points div").eq(nextIndex).addClass("curr");

        currentIndex = nextIndex;
        nextIndex++;

        if (nextIndex >= len)
            nextIndex = 0;
    }

})
