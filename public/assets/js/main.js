$(document).ready(function() {

    $("#toggle").click(function() {
        $(this).toggleClass("on");
        $(".menu-links").toggleClass("side-slide")
    });


    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $("header").addClass("header-scrolled");
        } else {
            $("header").removeClass("header-scrolled");
        }
    });

});

