$(function () {
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

    $(".detail-info-box").mouseenter(function() {
        $(".list-box dl").css("border-bottom", "0");
        $(".img-cover").css("border", "4px solid #d93600");
    })

    $(".detail-info-box").mouseleave(function() {
        $(".list-box dl").css("border-bottom", "1px solid #f0f0f0");
        $(".img-cover").css("border", "4px solid #d93600");
    })

    // 添加到购物车
    $(".addToCart").click(function() {
        $(".hint").css("display", "block");
        setTimeout(function() {
            $(".hint").css("display", "none");
        }, 2000)

        var _name = $(".img-name").text(),
            _price = parseFloat($(".item-price").text()),
            _num = parseFloat(1),
            _realNum = 100,
            _sub = _price * _num;

        $.cookie.json = true;
        var _products = $.cookie("products") || [];

        var index = exists(_name, _products);
        if (index === -1)
            _products.push({name: _name, price: _price, num: _num, realNum: _realNum, sub: _sub});
        else
            _products[index].num += 1;

        $.cookie("products", _products, {expires: 7, path: "/"});

    })

    function exists(name, array) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    $(".more-item").click(function() {
        if ($(this).val() === "+") {
            $(this).val("-");
            $(this).parent().children(".sub-list").css("display", "block");
        }
        else if ($(this).val() === "-") {
            $(this).val("+");
            $(this).parent().children(".sub-list").css("display", "none");
        }
    })
})
