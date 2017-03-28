$(function() {
    $("#wrap-foot").load("foot.html");

    $.cookie.json = true;
    var _products = $.cookie("products") || [],
        amount = null,
        _realNum = null,
        total = null;

    $.each(_products, function(index, element) {
        amount = element.num;
        _realNum = element.realNum;
        
        $(".product:last").clone(true)
                          .data("products", element)
                          .show()
                          .appendTo(".product-info")
                          .children(".name-item").text(element.name).end()
                          .children(".price-item").text("￥" + element.price + ".00").end()
                          .children(".num-item").children(".num-info").val(amount).end().end()
                          .children(".sub-item").children(".sub-info").text(element.sub);

    })

    // 删除商品所在行
    $(".delete-item").click(function() {
        var _product = $(this).parents(".product").data("products");
        var index = $.inArray(_product, _products);

        if (index !== -1) {
            _products.splice(index, 1);
            $.cookie("products", _products, {expires: 7, path: "/"});

            $(this).parents(".product").remove();
        }
        return false;
    })

    // 全选
    $("#all_check").click(function() {
        var state = $(this).prop("checked");
        $(".ck_product").prop("checked", state);
        // 全选复选框计算所选商品总价
        $.each(_products, function(index, element) {
            // console.log(_products.length);
            // total += _products.sub
        });
    })

    // 改变数量
    $(".product-info").on("blur", ".num-info", function() {
        amount = $(".num-info").val();
        if (amount <= 0) {
            amount = 1;
        }
        else if (amount >= _realNum) {
            amount = _realNum;
        }

        $(this).val(amount);
        $(this).parents(".product").data("products").num = amount;
        $(this).parents(".product").data("products").sub = $(this).parents(".product").data("products").price * amount;
        $.cookie("products", _products, {expires: 1, path: "/"});
        $(this).parent().next().children(".sub-info").text($(this).parents(".product").data("products").price * amount);
    })

    // 加
    $(".product-info").on("click", ".add", function() {
        amount++;
        if (amount > _realNum) {
            amount = _realNum;
            $(".hint-info").css("transform", "scale(1, 1)");
            setTimeout(function() {
                $(".hint-info").css("transform", "scale(0, 0)");
            }, 3000)
            return;
        }
        $(this).prev().val(amount);
        $(this).parents(".product").data("products").num = amount;
        $(this).parents(".product").data("products").sub = $(this).parents(".product").data("products").price * amount;
        $.cookie("products", _products, {expires: 1, path: "/"});
        $(this).parent().next().children(".sub-info").text($(this).parents(".product").data("products").price * amount);
    })

    // 减
    $(".product-info").on("click", ".minus", function() {
        amount--;
        if (amount <= 0) {
            amount = 1;
            return;
        }
        $(this).next().val(amount);
        $(this).parents(".product").data("products").num = amount;
        $.cookie("products", _products, {expires: 1, path: "/"});
        $(this).parent().next().children(".sub-info").text($(this).parents(".product").data("products").price * amount);
    })

})
