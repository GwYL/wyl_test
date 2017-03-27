$(function () {
    $("#login-btn").click(function() {
        $.post("../php/login.php", {username: $("#username").val(), password: $("#password").val()}, function(data) {
            console.log(data);
            if (data.status === 1) {
                location = "index.html";
            } else {
                $(".login-hint").css("display", "block");
                setTimeout(function() {
                    $(".login-hint").css("display", "none");
                }, 3000);
            }
        }, "json");
    })

})
