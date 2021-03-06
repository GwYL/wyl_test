$(function() {

    // 保存所有地址的对象
	var addresses = {};

	/* 读取 address.json 中的所有省市区信息 */
	$.ajax("../data/addresses.json").done(function(data){

		var provinces = data.regions;
		provinces.forEach(function(province){
			addresses[province.name] = {}; // 保存省份下城市的对象
			var cities = province.regions || [];
			cities.forEach(function(city){
				addresses[province.name][city.name] = city.regions;
			});
		});

		initProvince();
	});

	$("#province").change(initCity);
	$("#city").change(initDistrict);

	// 设置省份的显示信息
	function initProvince() {
		var html = "";
		for (var attr in addresses) {
			html += "<option value='"+attr+"'>"+attr+"</option>";
		}
		$("#province").append(html);
		initCity();
	}

	// 设置选中省份下的城市显示信息
	function initCity() {
		var currProvince = $("#province").val();
		// 获取该省份的城市信息，并显示
		var cities = addresses[currProvince],
			html = "";
		for (var attr in cities) {
			html += "<option value='"+ attr +"'>"+ attr +"</option>";
		}
		$("#city").empty().append(html);

		initDistrict();
	}

	// 设置选中省份与城市下的区县信息
	function initDistrict() {
		var currProvince = $("#province").val(),
			currCity = $("#city").val(),
			html = "";

		// 显示该选中城市下的区县
		var districts = addresses[currProvince][currCity] || [];
		districts.forEach(function(district){
			html += "<option value='"+ district.name +"'>"+ district.name +"</option>";
		});

		$("#district").empty().append(html);
	}

    $.cookie.json = true;
    var _products = $.cookie("products") || [],
        total = null;

    $.each(_products, function(index, element) {
        total += element.sub;
        $(".product:last").clone(true)
                          .data("products", element)
                          .show()
                          .appendTo(".products-info")
                          .children(".img-box").html('<img src= "' + element.imgSrc + '" />').end()
                          .children(".name-item").text(element.name).end()
                          .children(".price-item").text("￥" + element.price + ".00").end()
                          .children(".num-item").text(element.num).end()
                          .children(".sub-item").children(".sub-info").text(element.sub);

    })

    $(".total").text(total);

    var isExist = true; // 默认存在
    $(".save-btn").click(function() {
        if (isExist) {
            $.post("../php/order.php", {username: $("#username").val(), area: $("#area").val(), province: $("#province option:selected").val(), city: $("#city option:selected").val(), district: $("#district option:selected").val(), tel: $("#tel").val()}).then(
                function(data) {
                    data = JSON.parse(data);
                }
            )
            isExist = true;
        }
        return false;
    })

    $(".cancel").click(function() {
        $("#username").val() = "";
        $("#area").val() = "";
        $("#province option:selected").val() = "";
        $("#city option:selected").val() = "";
        $("#district option:selected").val() = "";
        $("#tel").val() = "";
        return false;
    })
})
