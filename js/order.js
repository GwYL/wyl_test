$(function() {
    $.ajax("head.html").done(function(data) {
        $.cookie.json = true;
        var user = $.cookie("loginUser") || {};
        if (!$.isEmptyObject(user)) {
            $("#header").find(".user_info").text(user.phone);
            $(".login").css("display", "none");
            $(".user-box").css("display", "inline-block");
            $(".exit-box").css("display", "inline-block");
            $(".register").css("display", "none");
        }

        /* 退出登录 */
        $("#header .exit").click(function() {
            user = {};
            $.cookie("loginUser", user, {expries: 7, path: "/"});
            location = "index.html";
        })
    })

    $("#wrap-foot").load("foot.html");

    // 保存所有地址的对象
	var addresses = {};

	/* 读取 address.json 中的所有省市区信息 */
	$.ajax("../data/addresses.json").done(function(data){
		// console.log(data);
		var provinces = data.regions;
		provinces.forEach(function(province){
			addresses[province.name] = {}; // 保存省份下城市的对象
			var cities = province.regions || [];
			cities.forEach(function(city){
				addresses[province.name][city.name] = city.regions;
			});
		});

		// console.log(addresses);

		initProvince();
	});

	// 当省份选择改变时：
	$("#province").change(initCity);
	// 当城市选择改变时：
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
		// 当前选中的省份
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
		// 当前选中的省份与城市
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
})
