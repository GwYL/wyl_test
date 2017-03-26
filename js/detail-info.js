$(function() {
    $("#wrap-head").load("head.html");
    $("#wrap-foot").load("foot.html");

    /* 放大镜 */
    $(".img-item img").mouseenter(function() {
    	$(".goods-detail-cover").css("display", "block");
    	$(".enlarge-img").css("display", "block");
    })

    $(".img-item img").mouseleave(function() {
    	$(".goods-detail-cover").css("display", "none");
    	$(".enlarge-img").css("display", "none");
    })
})
