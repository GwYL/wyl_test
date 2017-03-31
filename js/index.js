$(function() {
    /* 轮播图 */
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

    $("#wrap-banner").mouseenter(function() {
        clearInterval(timer);
    })
    $("#wrap-banner").mouseleave(function() {
        timer = setInterval(move, 5000);
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

    $.ajax("../data/dropmenu.json", {async: false}).done(function(data) {
        // 热卖热评商品数据加载
        var hot_html = template("hot-goods", data);
        $(".tab_container").html(hot_html);
        // 楼层数据加载
        var f_html = template("floor_item", data);
        $("#floor_box").html(f_html);
    })

    /* 楼层特效 */
    var _cover = document.createElement("div");
    $(_cover).addClass("cover");
    $(_cover).css({
        width: 197,
        height: 250,
        position: "absolute",
        top: 0,
        left: 0,
        background: "white",
        opacity: 0.6,
        display: "none"
    });
    $(".goods-items .item-info").append(_cover);
    $(".goods-items .item-info").mouseenter(function() {
        $(".cover").css("display", "block");
        // $(".cover").animate({opacity: 0.6}, 400 );
    })
    $(".item-info").mouseleave(function() {
        $(".cover").css("display", "none");
        // $(".cover").animate({opacity: 0}, 400 );
    })

    /* 热卖热评tab 切换 */
    $(".tab_content").hide();
    $(".tabs").children().eq(0).addClass("active").show();
    $(".tab_content").eq(0).show();
    var tab_bg = document.createElement("div");
    $(tab_bg).css({
        width: 196,
        height: 7,
        position: "absolute",
        background: "url(../images/tab_bg.gif) no-repeat",
        bottom: -2,
        left: -1
    })
    $(".tabs li:first").append(tab_bg);
    $(".tabs li:first").children().css("color", "#e4393c");
    //点击事件
    $(".tabs li").mouseenter(function() {
        $(".tabs li").children().css("color", "#454545");
        $(".tabs li").removeClass("active");
        $(this).addClass("active");
        $(this).append(tab_bg);
        $(".active").children().css("color", "#e4393c");
        $(".tab_content").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).css("display", "block");
        return false;
    });

    /* 楼层锚点平滑滚动 */
    var $root = $("html, body");
    $("#floor-bar a").click(function() {
        $root.animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 500);
        return false;
    })
    
});
