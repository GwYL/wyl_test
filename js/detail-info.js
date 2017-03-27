$(function() {
    $("#wrap-head").load("head.html");
    $("#wrap-foot").load("foot.html");

    $(".img-item img").elevateZoom({});

    /* 商品排行 tab 切换 */
    $(".ranking-box").hide();
    $(".ranking").children().eq(0).addClass("active").show();
    $(".ranking").children().eq(1).addClass("active").show();
    $(".ranking-box").eq(0).show();
    //点击事件
    $(".ranking-tab span").mouseenter(function() {
        $(".ranking-tab span").removeClass("active"); //移除class="active"属性
        $(this).addClass("active"); //添加class="active"到选择标签中
        $(".ranking-box").hide(); //隐藏全部标签内容
        var activeTab = $(this).find("a").attr("href"); //找到所属属性值来识别活跃选项卡和内容
        $(activeTab).fadeIn(); //使内容消失
        return false;
    });
})
