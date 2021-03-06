$(function() {
    // 放大镜
    $(".img-item img").elevateZoom({});

    // 数量
    $("#num").blur(function() {
        if ($("#num").val() > parseInt($(".real-num").text())) {
            $("#num").val(100);
            $(".hint-info").css("display", "block");
            setTimeout(function() {
                $(".hint-info").css("display", "none");
            }, 2000)
        }
    })

    // 数量加
    $(".add").click(function() {
        var amount = $("#num").val();
        amount++;
        if (amount > parseInt($(".real-num").text())) {
            amount = 100;
            $("#num").val(100);
            $(".hint-info").css("display", "block");
            setTimeout(function() {
                $(".hint-info").css("display", "none");
            }, 2000)
        }
        $("#num").val(amount);
    })

    // 数量减
    $(".minus").click(function() {
        var amount = $("#num").val();
        amount--;
        if (amount <= 1) {
            amount = 1;
        }
        $("#num").val(amount);
    })

    // 添加到购物车
    $(".addtocart").click(function() {
        $.cookie.json = true;
        var user = $.cookie("loginUser") || {};
        if ($.isEmptyObject(user)) {
            location = "login.html";
            return;
        }

        var _name = $(".gname").text(),
            _price = parseFloat($(".item-price").text().slice(1)),
            _num = parseFloat($("#num").val()),
            _realNum = parseFloat($(".real-num").text()),
            _sub = _price * _num,
            _imgSrc = $(".img-item").find("img").attr("src");

        if ($("#num").val() >= _realNum) {
            $(".no-product").css("display", "block");
            setTimeout(function() {
                $(".no-product").css("display", "none");
            }, 2000)
            return;
        } else {
            $(".success-info").css("display", "block");
            setTimeout(function() {
                $(".success-info").css("display", "none");
            }, 2000)
        }

        var _products = $.cookie("products") || [];

        var index = exists(_name, _products);
        if (index === -1)
            _products.push({name: _name, price: _price, num: _num, realNum: _realNum, sub: _sub, imgSrc: _imgSrc});
        else
            _products[index].num += parseFloat($("#num").val());

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

    /* 商品详情、评价切换 */
    $(".detail-subnav li:first").addClass("choose-item");
    $(".detail-subnav li").click(function() {
        $(".detail-subnav li").removeClass("choose-item");
        $(this).addClass("choose-item");
    })

    $(".level li:first").addClass("choose-item");
    $(".level li").click(function() {
        $(".level li").removeClass("choose-item");
        $(this).addClass("choose-item");
    })

    /* 商品排行 tab 切换 */
    $(".ranking-box").hide();
    $(".ranking").children().eq(0).addClass("active").show();
    $(".ranking").children().eq(1).addClass("active").show();
    $(".ranking-box").eq(0).show();
    //点击事件
    $(".ranking-tab span").mouseenter(function() {
        $(".ranking-tab span").removeClass("active");
        $(this).addClass("active");
        $(".ranking-box").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });

    /* 商品详情、评价等吸顶 */
    var _height = $(".detail-subnav").offset().top;
    $(window).scroll(function() {
        var _height2 = $(".details-subnav").offset().top;
        var _scrollTop = $(document).scrollTop() || $("body").scrollTop();
        if (_scrollTop > _height) {
            $(".detail-subnav").addClass("top-subnav");
        } else if (_scrollTop <= _height) {
            $(".detail-subnav").removeClass("top-subnav");
        } else {
            $(".detail-subnav").removeClass("top-subnav");
        }
    })

})
