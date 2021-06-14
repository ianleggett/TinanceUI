$( document ).ready(function() {
    'use strict';
    function navMenu() {
        $('[data-toggle="navbarToggler"]').on('click', function () {
            $('.navbar').toggleClass('active');
            $('body').toggleClass('canvas-open');
        });
        $('.navbar-toggler').on('click', function () {
            $('.navbar-toggler-icon').toggleClass('active');
        });
        var $stickyNav = $(".navbar-sticky");
        $(window).on("scroll load", function () {
            var scroll = $(window).scrollTop();
            if (scroll >= 120) {
                $stickyNav.addClass("navbar-sticky-moved-up");
            } else {
                $stickyNav.removeClass("navbar-sticky-moved-up");
            }
            // apply transition
            if (scroll >= 250) {
                $stickyNav.addClass("navbar-sticky-transitioned");
            } else {
                $stickyNav.removeClass("navbar-sticky-transitioned");
            }
            // sticky on
            if (scroll >= 500) {
                $stickyNav.addClass("navbar-sticky-on");
            } else {
                $stickyNav.removeClass("navbar-sticky-on");
            }

        });
    }
    navMenu();
});