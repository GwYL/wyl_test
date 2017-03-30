$(function() {
    // 加载公共部分
    // $("#wrap-head").load("head.html");
    $.ajax("head.html").done(function(data) {
        $.cookie.json = true;
        var user = $.cookie("loginUser") || {};
        if (!$.isEmptyObject(user)) {
            $(data).appendTo("#wrap-head").find(".user_info").text(user.phone);
            $(".login").css("display", "none");
            $(".user-box").css("display", "inline-block");
            $(".exit-box").css("display", "inline-block");
            $(".register").css("display", "none");
        } else {
            $(data).appendTo("#wrap-head");
        }

        /* 退出登录 */
        $("#header .exit").click(function() {
            $("#wrap-head").empty();
            user = {};
            $.cookie("loginUser", user, {expries: 7, path: "/"});
            $(data).appendTo("#wrap-head");
        })
    })

    $("#wrap-foot").load("foot.html");

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

    // 热卖商品等模板添加
    var t1 = {
        list: ["明仁风 酸枝 罗汉床1", "明仁风 酸枝 罗汉床2", "明仁风 酸枝 罗汉床3", "明仁风 酸枝 罗汉床4", "明仁风 酸枝 罗汉床5"]
    }
    var thtml1 = template("hot-goods", t1);
    $("#tab1").html(thtml1);

    var t2 = {
        list: ["太行浩林 单瓶500ML1", "太行浩林 单瓶500ML2", "太行浩林 单瓶500ML3", "太行浩林 单瓶500ML4", "太行浩林 单瓶500ML5"]
    }
    var thtml2 = template("hot-goods", t2);
    $("#tab2").html(thtml2);

    var t3 = {
        list: ["Topan拓泰 手持式家用吸尘器1", "Topan拓泰 手持式家用吸尘器2", "Topan拓泰 手持式家用吸尘器3", "Topan拓泰 手持式家用吸尘器4", "Topan拓泰 手持式家用吸尘器5"]
    }
    var thtml3 = template("hot-goods", t3);
    $("#tab3").html(thtml3);

    // 楼层-->模板添加内容
    var data_f1 = {
        list: ["阳光社区牛蒡佐伴1", "阳光社区牛蒡佐伴2", "阳光社区牛蒡佐伴3", "阳光社区牛蒡佐伴4", "阳光社区牛蒡佐伴5", "阳光社区牛蒡佐伴6", "阳光社区牛蒡佐伴7", "阳光社区牛蒡佐伴8", "阳光社区牛蒡佐伴9", "阳光社区牛蒡佐伴10"]
    }
    var html1 = template("f_box", data_f1);
    $("#f1 .goods-items").html(html1);
    var data_f2 = {
        list: ["老爷岭榛蘑200g1", "老爷岭榛蘑200g2", "老爷岭榛蘑200g3", "老爷岭榛蘑200g4", "老爷岭榛蘑200g5", "老爷岭榛蘑200g6", "老爷岭榛蘑200g7", "老爷岭榛蘑200g8", "老爷岭榛蘑200g9", "阳老爷岭榛蘑200g10"]
    }
    var html2 = template("f_box", data_f2);
    $("#f2 .goods-items").html(html2);
    var data_f3 = {
        list: ["心语空气加湿器-花瓶加湿器1", "心语空气加湿器-花瓶加湿器2", "心语空气加湿器-花瓶加湿器3", "心语空气加湿器-花瓶加湿器4", "心语空气加湿器-花瓶加湿器5", "心语空气加湿器-花瓶加湿器6", "心语空气加湿器-花瓶加湿器7", "心语空气加湿器-花瓶加湿器8", "心语空气加湿器-花瓶加湿器9", "心语空气加湿器-花瓶加湿器10"]
    }
    var html3 = template("f_box", data_f3);
    $("#f3 .goods-items").html(html3);
    var data_f4 = {
        list: ["咪咪熊M6蒸蛋器1", "咪咪熊M6蒸蛋器2", "咪咪熊M6蒸蛋器3", "咪咪熊M6蒸蛋器4", "咪咪熊M6蒸蛋器5", "咪咪熊M6蒸蛋器6", "咪咪熊M6蒸蛋器7", "咪咪熊M6蒸蛋器8", "咪咪熊M6蒸蛋器9", "咪咪熊M6蒸蛋器10"]
    }
    var html4 = template("f_box", data_f4);
    $("#f4 .goods-items").html(html4);

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
        $(".tabs li").removeClass("active"); //移除class="active"属性
        $(this).addClass("active"); //添加class="active"到选择标签中
        $(this).append(tab_bg);
        $(".active").children().css("color", "#e4393c");
        $(".tab_content").hide(); //隐藏全部标签内容
        var activeTab = $(this).find("a").attr("href"); //找到所属属性值来识别活跃选项卡和内容
        $(activeTab).fadeIn(100); //使内容消失
        return false;
    });

    /* 楼层锚点平滑滚动 */
    // $(window).scroll(function() {
    //     var scrollTop = $(window).scrollTop()
    //
    // })
    //
});
