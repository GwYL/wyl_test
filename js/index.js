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
        var hot_html = template("hot-goods", data);
        $(".tab_container").html(hot_html);
    })
    // $.ajax("../data/index.json", {async: false}).done(function(data_f) {
    //     var f_html = template("floor_item", data_f);
    //     $("#floor_box").html(f_html);
    // })

    var data_f = {
        "f_list": [
            {
                "f_id": "1",
                "f_name": "1",
                "f_title": "商城自营",
                "right_title": "营养/保健",
                "goods_contents": {
                    "goods_list": [
                        {"item_title": "阳光社区牛蒡佐伴1"},
                        {"item_title": "阳光社区牛蒡佐伴2"},
                        {"item_title": "阳光社区牛蒡佐伴3"},
                        {"item_title": "阳光社区牛蒡佐伴4"},
                        {"item_title": "阳光社区牛蒡佐伴5"},
                        {"item_title": "阳光社区牛蒡佐伴6"},
                        {"item_title": "阳光社区牛蒡佐伴7"},
                        {"item_title": "阳光社区牛蒡佐伴8"},
                        {"item_title": "阳光社区牛蒡佐伴9"},
                        {"item_title": "阳光社区牛蒡佐伴10"},
                    ]
                }
            },{
                "f_id": "2",
                "f_name": "2",
                "f_title": "健康食品",
                "right_title": "商品推荐",
                "goods_contents": {
                    "goods_list": [
                        {"item_title": "老爷岭榛蘑200g1"},
                        {"item_title": "老爷岭榛蘑200g2"},
                        {"item_title": "老爷岭榛蘑200g3"},
                        {"item_title": "老爷岭榛蘑200g4"},
                        {"item_title": "老爷岭榛蘑200g5"},
                        {"item_title": "老爷岭榛蘑200g6"},
                        {"item_title": "老爷岭榛蘑200g7"},
                        {"item_title": "老爷岭榛蘑200g8"},
                        {"item_title": "老爷岭榛蘑200g9"},
                        {"item_title": "老爷岭榛蘑200g10"},
                    ]
                }
            },{
                "f_id": "3",
                "f_name": "3",
                "f_title": "生活用品",
                "right_title": "商品推荐",
                "goods_contents": {
                    "goods_list": [
                        {"item_title": "心语空气加湿器-花瓶加湿器1"},
                        {"item_title": "心语空气加湿器-花瓶加湿器2"},
                        {"item_title": "心语空气加湿器-花瓶加湿器3"},
                        {"item_title": "心语空气加湿器-花瓶加湿器4"},
                        {"item_title": "心语空气加湿器-花瓶加湿器5"},
                        {"item_title": "心语空气加湿器-花瓶加湿器6"},
                        {"item_title": "心语空气加湿器-花瓶加湿器7"},
                        {"item_title": "心语空气加湿器-花瓶加湿器8"},
                        {"item_title": "心语空气加湿器-花瓶加湿器9"},
                        {"item_title": "心语空气加湿器-花瓶加湿器10"},
                    ]
                }
            },{
                "f_id": "4",
                "f_name": "4",
                "f_title": "健康理疗",
                "right_title": "商品推荐",
                "goods_contents": {
                    "goods_list": [
                        {"item_title": "咪咪熊M6蒸蛋器1"},
                        {"item_title": "咪咪熊M6蒸蛋器2"},
                        {"item_title": "咪咪熊M6蒸蛋器3"},
                        {"item_title": "咪咪熊M6蒸蛋器4"},
                        {"item_title": "咪咪熊M6蒸蛋器5"},
                        {"item_title": "咪咪熊M6蒸蛋器6"},
                        {"item_title": "咪咪熊M6蒸蛋器7"},
                        {"item_title": "咪咪熊M6蒸蛋器8"},
                        {"item_title": "咪咪熊M6蒸蛋器9"},
                        {"item_title": "咪咪熊M6蒸蛋器10"},
                    ]
                }
            }
        ]
    }


    // 楼层-->模板添加内容
    var f_html = template("floor_item", data_f);
    $("#floor_box").html(f_html);

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
    // $(window).scroll(function() {
    //     var scrollTop = $(window).scrollTop()
    //
    // })
    //
});
