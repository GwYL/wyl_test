$(function() {
    // 加载公共部分
    // $("#wrap-head").load("head.html");
    $.ajax("head.html").done(function(data) {
        $.cookie.json = true;
        var user = $.cookie("loginUser") || {};
        if (!$.isEmptyObject(user)) {
            if ($("#wrap-head").length > 0)
                $(data).appendTo("#wrap-head").find(".user_info").text(user.phone);
            else
                $("#header").find(".user_info").text(user.phone);
            $(".login").css("display", "none");
            $(".user-box").css("display", "inline-block");
            $(".exit-box").css("display", "inline-block");
            $(".register").css("display", "none");
        } else {
            $(data).appendTo("#wrap-head");
        }
        setInterval(function() {
            var products = $.cookie("products") || {};
            if (!$.isEmptyObject(products)) {
                $("#header .cart-num").css("display", "block");
                $("#header .cart-num").text(products.length);
            } else {
                $("#header .cart-num").css("display", "none");                
            }
        }, 100)

        $(function() {
            /* 商品、店铺切换 */
            $("#search .products").addClass("active-item");
            $("#search li").click(function() {
                $(".search-form div").css("display", "none");
                $("#search li").removeClass("active-item");
                $(this).addClass("active-item");
                var currInfo = $(this).find("a").attr("href");
                $(currInfo).css("display", "block");
                return false;
            })
        })

        /* 退出登录 */
        $("#header .exit").click(function() {
            $("#wrap-head").empty();
            user = {};
            $.cookie("loginUser", user, {expries: 7, path: "/"});
            $(data).appendTo("#wrap-head");
        })
    })

    $("#wrap-foot").load("foot.html");
})
