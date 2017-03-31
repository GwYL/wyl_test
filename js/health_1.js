$(function () {
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
            _sub = _price * _num,
            _imgSrc = $(".img-box").find("img").attr("src");

        $.cookie.json = true;
        var _products = $.cookie("products") || [];

        var index = exists(_name, _products);
        if (index === -1)
            _products.push({name: _name, price: _price, num: _num, realNum: _realNum, sub: _sub, imgSrc: _imgSrc});
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
