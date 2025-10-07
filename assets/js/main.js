/* ===================================================================
    Author          : Modina Theme
    Version         : 1.0
* ================================================================= */

(function($) {
    "use strict";

    $(document).ready( function() {
        //>> Mobile Menu Js Start <<//
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });

        //>> Sidebar Toggle Js Start <<//
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        });
        $(".sidebar__toggle").on("click", function() {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
        });

        //>> Body Overlay Js Start <<//
        $(".body-overlay").on("click", function() {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });

        //>> Sticky Header Js Start <<//

        $(window).scroll(function() {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

        //>> Wow Animation Start <<//
        new WOW().init();

         //>> Video Popup Start <<//
         $(".img-popup2").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {}
        });


        //>> Wow Animation Start <<//
        new WOW().init();

        //>> Nice Select Start <<//
        if ($('.single-select').length) {
            $('.single-select').niceSelect();
        }

        $('.odometer').appear(function(e) {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });

        // team member effetct
        $('.team-title').each(function(index) {
            const $contentBox = $(this);
            const $teamBox = $('.team-image').eq(index);
        
            // Add hovered class
            const addHover = function() {
                $teamBox.addClass('hovered');
            };
        
            // Remove hovered class with relatedTarget check
            const removeHover = function(e) {
                const toElement = e.relatedTarget;
                if ($contentBox[0].contains(toElement) || $teamBox[0].contains(toElement)) {
                    return;
                }
                $teamBox.removeClass('hovered');
            };
        
            // Bind mouseenter and mouseleave events
            $contentBox.on('mouseenter', addHover);
            $contentBox.on('mouseleave', removeHover);
        
            $teamBox.on('mouseenter', addHover);
            $teamBox.on('mouseleave', removeHover);
        });           

        //>> Brand Start <<//
        if($('.brand-slider').length > 0) {
            const brandSlider = new Swiper(".brand-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 6,
                    },
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    400: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Project Start <<//
        if($('.project-slider').length > 0) {
            const projectSlider = new Swiper(".project-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Testimonial Start <<//
        if($('.testimonial-slider').length > 0) {
            const testimonialSlider = new Swiper(".testimonial-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Testimonial Start <<//
        if($('.testimonial-slider-2').length > 0) {
            const testimonialSlider2 = new Swiper(".testimonial-slider-2", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    991: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.testimonial-slider-4').length > 0) {
            const testimonialSlider4 = new Swiper(".testimonial-slider-4", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 2,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.testimonial-slider-3').length > 0) {
            const testimonialSlider3 = new Swiper(".testimonial-slider-3", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 2,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Text Slider Start <<//
        if($('.marquee-text-slider').length > 0) {
            const marqueeTextSlider = new Swiper(".marquee-text-slider", {
                slidesPerView: 'auto',
                spaceBetween: 40,
                freemode: true,
                centeredSlides: true,
                loop: true,
                speed: 6000,
                allowTouchMove: false,
                autoplay: {
                    delay: 1,
                    disableOnInteraction: true,
                },
            });
        }

        if($('.marquee-text-slider-2').length > 0) {
            const marqueeTextSlider2 = new Swiper(".marquee-text-slider-2", {
                slidesPerView: 'auto',
                spaceBetween: 40,
                freemode: true,
                centeredSlides: true,
                loop: true,
                speed: 6000,
                allowTouchMove: false,
                autoplay: {
                    delay: 1,
                    disableOnInteraction: true,
                },
            });
        }

        //>> Instagram Slider Start <<//
        if($('.instagram-banner-slider').length > 0) {
            const instagrambannerSlider = new Swiper(".instagram-banner-slider", {
                spaceBetween: 20,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 12,
                    },
                    1199: {
                        slidesPerView: 8,
                    },
                    991: {
                        slidesPerView: 6,
                    },
                    767: {
                        slidesPerView: 4,
                    },
                    650: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    425: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

         /* Text Effect Animation */
    if ($(".text-anim").length) {
        let staggerAmount = 0.03,
            translateXValue = 20,
            delayValue = 0.1,
            easeType = "power2.out",
            animatedTextElements = document.querySelectorAll(".text-anim");

        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, {
                type: "chars, words"
            });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValue,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
            });
        });
    }

        // quntity increment and decrement
        const quantityIncrement = document.querySelectorAll(".quantityIncrement");
        const quantityDecrement = document.querySelectorAll(".quantityDecrement");
        if (quantityIncrement && quantityDecrement) {
            quantityIncrement.forEach((increment) => {
                increment.addEventListener("click", function () {
                    const value = parseInt(
                        increment.parentElement.querySelector("input").value, 10
                    );
                    increment.parentElement.querySelector("input").value = value + 1;
                });
            });

            quantityDecrement.forEach((decrement) => {
                decrement.addEventListener("click", function () {
                    const value = parseInt(
                        decrement.parentElement.querySelector("input").value, 10
                    );
                    if (value > 1) {
                        decrement.parentElement.querySelector("input").value = value - 1;
                    }
                });
            });
        }

        //>> CountDown Start <<//
        let targetDate = new Date("2025-08-05 00:00:00").getTime();
        const countdownInterval = setInterval(function () {
            let currentDate = new Date().getTime();
            let remainingTime = targetDate - currentDate;

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                // Display a message or perform any action when the countdown timer reaches zero
                $("#countdown-container").text("Countdown has ended!");
            } else {
                let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                let hours = Math.floor(
                    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                let minutes = Math.floor(
                    (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
                );
                let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                // Pad single-digit values with leading zeros
                $("#day").text(days.toString().padStart(2, "0"));
                $("#hour").text(hours.toString().padStart(2, "0"));
                $("#min").text(minutes.toString().padStart(2, "0"));
                $("#sec").text(seconds.toString().padStart(2, "0"));
            }
        }, 1000);

        // image-paralax-animation-start
        gsap.utils.toArray(".image-pllx").forEach(function(container) {
            let image = container.querySelector("img");

            let tl = gsap.timeline({
                scrollTrigger: {
                trigger: container,
                scrub: true,
                pin: false,
                },
            });
            tl.from(image, {
                yPercent: -30,
                scale: 1.1,
                ease: "none",
            }).to(image, {
                yPercent: 30,
                scale: 1.1,
                ease: "none",
            });
        });

        // asslideupcta
        gsap.utils.toArray(" .asslideupcta").forEach((el, index) => {
            let tlcta = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    scrub: 1,
                    start: "top 90%",
                    end: "top 70%",
                    toggleActions: "play none none reverse",
                    markers: false,
                },
            });

            tlcta
                .set(el, { transformOrigin: "center center" })
                .from(
                    el,
                    { opacity: 1, y: "+=300" },
                    { opacity: 1, y: 0, duration: 1, immediateRender: false }
                );
        });

        // choose-5-img
        var agnChoose5img = gsap.timeline({
            scrollTrigger: {
                trigger: ".agn-choose-5-img",
                start: "top 90%",
                toggleActions: "play reverse play reverse",
                markers: false,
            },
            defaults: {
                ease: "ease5",
                duration: .4,
            },
        })

        agnChoose5img
        .from(".agn-choose-5-img", {
            transformOrigin: "bottom left",
            transform: "rotate(62deg) translate(-152px, 86px)",

        })

         // Search bar
         $(".search-toggle").on('click', function(){
            $(".header-search-bar").addClass("search-open");
            $(".offcanvas-overlay").addClass("offcanvas-overlay-open");
        });

        $(".search-close,.offcanvas-overlay").on('click', function(){
            $(".header-search-bar").removeClass("search-open");
            $(".offcanvas-overlay").removeClass("offcanvas-overlay-open");
        });

        //>> Back To Top Slider Start <<//
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 20) {
                $("#back-top").addClass("show");
            } else {
                $("#back-top").removeClass("show");
            }
        });

        $(document).on('click', '#back-top', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });

        
    }); // End Document Ready Function

    //>> Preloader Start <<//
    function loader() {
        $(window).on('load', function() {
            // Animate loader off screen
            $(".preloader").addClass('loaded');                    
            $(".preloader").delay(600).fadeOut();                       
        });
    }
    loader();
    
})(jQuery); // End jQuery

