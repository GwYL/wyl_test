$(function() {
    var isExist = true; // 判断该用户是否存在,默认存在

    /* 正则表达式判断注册信息是否符合要求 */
    var phoneRegExp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        passwordRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
        emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    // 手机号码
    $("#phone").blur(function() {
        if (phoneRegExp.test($("#phone").val()) === false) {
            $("#phone_info").text("手机号格式错误");
            return;
        } else {
            $("#phone_info").text("");
            $.getJSON("../php/user.php", {phone: $(this).val()}, function(data) {
                if (data.status === 1) {
                    $("#phone_info").text("手机号已绑定，请换一个手机号！！！");
                    isExist = true;
                } else {
                    $("#phone_info").text("该手机号码可用");
                    isExist = false;
                }
            })
        }
    })

    // 密码
    $("#password").blur(function() {
        if (passwordRegExp.test($("#password").val()) === false) {
            $("#password_info").text("请输入正确的密码:密码由两种字符组成且长度为6-20");
        } else {
            $("#password_info").text("");
        }
    })

    // 确认密码
    $("#pwd").blur(function() {
        if ($("#pwd").val() !== $("#password").val()) {
            $("#pwd_info").text("两次输入密码不一致，请重新确认密码");
        } else {
            $("#pwd_info").text("");
        }
    })

    // 邮箱
    $("#email").blur(function() {
        if (emailRegExp.test($("#email").val()) === false) {
            $("#email_info").text("邮箱格式错误!!");
        } else {
            $("#email_info").text("");
        }
    })

    $("#submit").click(function() {
        if ($("#agree").is(":checked")) {
            if (!isExist) {
                $.post("../php/register.php", {phone: $("#phone").val(), password: $("#password").val(), email: $("#email").val()}).then(
                    function(data) {
                        data = JSON.parse(data);
                        console.log("response:",data);
                        console.log(data.status);
                        if (data.status === 1) {
                            console.log("success");
                            window.location = "login.html";
                        }
                        else {
                            $("#register_info").text("用户注册失败, " + data.message);
                        }
                    }
                );
                isExist = true;
            }
        }
    })

})
