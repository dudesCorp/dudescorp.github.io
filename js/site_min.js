$(document).keydown(function(e) {
    switch (e.which) {
        case 37:
            $("#prev").click();
            break;
        case 38:
            $("#prev").click();
            break;
        case 39:
            $("#next").click();
            break;
        case 40:
            $("#next").click();
            break;
        default:
            return
    }
    e.preventDefault()
}), $(window).scroll(function(e) {
    var o = ($(window).height(), $(window).scrollTop());
    o > 50 ? $("#header .logo").addClass("off") : $("#header .logo").removeClass("off")
}), $(document).ready(function() {
    function e() {
        var e = document.getElementById("video"),
            o = document.getElementById("mute"),
            t = document.getElementById("full-screen"),
            a = document.getElementById("seek-bar");
        o.addEventListener("click", function() {
            if (0 == e.muted) {
                e.muted = !0;
                var o = $(this).data("sound");
                console.log(o), $(this).attr("src", o), console.log("muted")
            } else {
                e.muted = !1;
                var o = $(this).data("muted");
                $(this).attr("src", o), console.log("not muted")
            }
        }), t.addEventListener("click", function() {
            e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen()
        }), a.addEventListener("change", function() {
            var o = e.duration * (a.value / 100);
            e.currentTime = o
        }), e.addEventListener("timeupdate", function() {
            var o = 100 / e.duration * e.currentTime;
            a.value = o
        }), a.addEventListener("mousedown", function() {
            e.pause()
        }), a.addEventListener("mouseup", function() {
            e.play()
        })
    }

    function o(e, o) {
        var e = e,
            t = e.find(".videoHolder"),
            a = t.data("type"),
            s = t.data("video");
        if (e.find(".inner iframe").remove(), "embed" === a) {
            e.find(".inner").prepend(s);
            var i = e.find("iframe, embed"),
                n = i.attr("width"),
                d = i.attr("height"),
                l = d / n,
                r = i.parent().width(),
                c = r * l;
            if (i.height(c).width(r), "yes" == o) {
                var u = i.attr("src"),
                    h = u.indexOf("?");
                h >= 0 ? i.attr("src", u + "&autoplay=1") : i.attr("src", u + "?autoplay=1")
            }
        } else e.find(".inner").prepend(s), document.getElementById("video").play()
    }

    function t(e) {
        var o = e.attr("width"),
            t = e.attr("height"),
            a = t / o,
            s = e.parent().width(),
            i = s * a;
        e.height(i).width(s)
    }

    function a() {
        $("body.home #loader .logos").addClass("on"), $("body.home #loader .line2").delay(300).addClass("on");
        var e = {
                fluidClass: "imgix-fluid-bg",
                updateOnResizeDown: !0,
                updateOnPinchZoom: !0,
                pixelStep: 10,
                autoInsertCSSBestPractices: !0
            },
            o = {
                fluidClass: "imgix-fluid",
                updateOnResizeDown: !0,
                updateOnPinchZoom: !0,
                pixelStep: 10,
                autoInsertCSSBestPractices: !0
            };
        imgix.onready(function() {
            imgix.fluid(e), imgix.fluid(o)
        });
        var a = $(window).height(),
            s = $(window).width();
        if (768 > s) {
            $("html").addClass("mobile")
        } else {
            $("html").removeClass("mobile")
        }
        $("iframe").each(function() {
            t($(this))
        }), $(".ratioSize").each(function() {
            var e = $(this).data("ratio"),
                o = $(this).width(),
                t = Math.ceil(o * e);
            if ($(this).hasClass("tall")) $(this).height(t);
            else if ($(this).hasClass("full")) $(this).height(t);
            else if ($(this).hasClass("rect")) {
                var a = Math.ceil(t / 2);
                $(this).height(a)
            } else $(this).height(t)
        }), $(".cell.sizer").each(function() {
            var e = $(this).width(),
                o = $(this).data("ratio"),
                t = e / o;
            $("#grid .cell").height(t)
        }), $(".bheight").height(a);
        var i = $("#grid .gutter-sizer").width();
        $("#grid li").css("margin-bottom", i), $(".mobile .spacer").height(i);
        var n = $(".grid ul.tags").width();
        $(".grid ul.tags").css("top", n + 310);
        var d = $(".project h2.more").width();
        $(".project h2.more").css("right", -1 * (d - 50)), setTimeout(function() {
            var e = $(".grid h1.pageTitle").height();
            $(".grid h1.pageTitle").animate({
                top: -1 * e + .25 * e,
                opacity: 1
            }, {
                duration: 1e3,
                specialEasing: {
                    opacity: "linear",
                    top: "easeOutQuart"
                },
                complete: function() {}
            })
        }, 600)
    }

    function s(o, t) {
        o.indexOf("/work/") >= 0 ? $("#loader").css("background-color", "#000").addClass("on") : $("#loader").css("background-color", t).addClass("on"), setTimeout(function() {
            $.get("/content.php", {
                page: o
            }, function(s) {
                $("#content").html(s), $("body").removeClass();
                var i = $("body").data("color");
                "/directors" === o && ($("body").addClass("directors").css("background-color", "#000"), $("#bg").css("background", "none")), o.indexOf("/director/") >= 0 && (window.scrollTo(0, 0), "undefined" != typeof i ? $("body").addClass("grid director").css("background-color", i) : $("body").addClass("grid director").css("background-color", t), getSocial()), o.indexOf("/work/") >= 0 && (window.scrollTo(0, 0), $("body").data("color", t), $("body").addClass("project paused").css("background-color", "#000"), e()), a(), setTimeout(function() {
                    $("#loader").removeClass("on")
                }, 500)
            })
        }, 600)
    }

    function i() {
        var e = $(".credits ul"),
            o = 2,
            t = "li",
            a = "col";
        e.each(function() {
            for (var e = new Array, s = $(this).find(t), i = Math.floor(s.length / o), n = s.length - i * o, d = 0; o > d; d++) n > d ? e[d] = i + 1 : e[d] = i;
            for (var d = 0; o > d; d++) {
                $(this).append($("<ul ></ul>").addClass(a));
                for (var l = 0; l < e[d]; l++) {
                    for (var r = 0, c = 0; d > c; c++) r += e[c];
                    $(this).find("." + a).last().append(s[l + r])
                }
            }
        })
    }
    $("#content").addClass("on"), setTimeout(function() {
        $("#fullpage").css("opacity", 1), setTimeout(function() {
            $("#loader").removeClass("on")
        }, 500), setTimeout(function() {
            $(".home.splash .fixed").fadeTo(1e3, 1)
        }, 500), setTimeout(function() {
            $(".home.splash .thetitles").fadeTo(1e3, 1), $(".home.splash .thearrows").fadeTo(1e3, 1)
        }, 1e3)
    }, 200), setTimeout(function() {
        $(".infoHolder.first .info").fadeTo(1500, 1)
    }, 300), $("#scene").parallax({}), $("video").length && e(), $("#content").on("click", ".playVideo", function(e) {
        var o = document.getElementById("video");
        $("#video").css("opacity", 1);
        var t = $(this).data("pause");
        $(this).attr("src", t), $(this).removeClass("playVideo").addClass("pauseVideo"), $("body").addClass("playing").removeClass("paused"), o.play(), $(".imgholder").delay(600).css("display", "none");
        var a = null;
        $(document).on("mousemove", function() {
            $(".arrowPlay").removeClass("hide"), $("#video-controls").removeClass("hide"), clearTimeout(a), a = setTimeout(function() {
                $(".arrowPlay").addClass("hide"), $("#video-controls").addClass("hide")
            }, 1500)
        })
    }), $("#content").on("click", ".pauseVideo", function(e) {
        var o = $(this).data("play");
        $(this).attr("src", o), $(this).removeClass("pauseVideo").addClass("playVideo"), $("body").removeClass("playing").addClass("paused");
        var t = document.getElementById("video");
        t.pause()
    }), $("#content").on("click", ".closeVideo", function(e) {
        $("body").removeClass("playing").addClass("paused");
        var o = document.getElementById("video"),
            t = $(".arrowPlay").data("play");
        $(".arrowPlay").attr("src", t).removeClass("hide"), o.pause()
    }), $(".section.video").each(function() {
        o($(this), "yes")
    }), a(), $(".trigger").click(function() {
        if ($("body").toggleClass("navOpen"), $("body").hasClass("navOpen")) {
            var e = 100,
                o = e;
            $("#overlay ul.nav li").each(function() {
                $(this).delay(o).fadeTo(300, 1), o += e
            })
        } else $("#overlay ul.nav li").css("opacity", 0)
    }), $("#content").on("mouseenter", "ul.dirlist li", function(e) {
        var o = $(this).data("img");
        $("#bg").stop().fadeTo(300, 0, function() {
            $("#bg").css("background-image", "url(" + o + ")"), $("#bg").fadeTo(600, 1)
        })
    });
    var n = $("#fullpage .section").length;
    $("#fullpage").fullpage({
        scrollBar: !1,
        scrollingSpeed: 1e3,
        onLeave: function(e, o, t) {
            setTimeout(function() {
                $(".home .counter h1").html("0" + o)
            }, 1e3), 1 == o ? $("body").removeClass("scrolling") : $("body").addClass("scrolling"), $("#content #section" + e).removeClass("fp-completely"), $("#content #section" + e).addClass("off").removeClass("on"), $("#content #section" + o).addClass("on").removeClass("off"), "down" === t ? ($("#info" + e).addClass("off " + t).removeClass("on"), $("#info" + o).addClass("on").removeClass("off"), $("#bg" + e).removeClass("between upcoming up"), $("#bg" + o).addClass("between " + t), setTimeout(function() {
                $("#bg" + e).removeClass("on down"), $("#bg" + o).addClass("on")
            }, 1200)) : ($("#info" + e).addClass("off " + t), $("#info" + o).addClass("on").removeClass("off"), $("#bg" + o).addClass("upcoming between " + t), $("#bg" + e).addClass(t).removeClass("down upcoming on"), setTimeout(function() {
                $("#info" + e).removeClass("on up off"), $("#bg" + e).removeClass("on upcoming up between"), $("#bg" + o).addClass("on")
            }, 1200)), n - 1 == e ? $(".arrowholder").hide() : e > 0 ? $(".arrowholder.white").show() : $(".arrowholder.black").show()
        }
    }), $("body").on("click", "a.ajax", function(e) {
        e.preventDefault();
        var o = $(this).attr("href"),
            t = $(this).data("color");
        s(o, t), history.pushState("", "New URL: " + o, o)
    }), window.addEventListener("load", function() {
        setTimeout(function() {
            window.addEventListener("popstate", function() {
                s(location.pathname)
            })
        }, 0)
    }), i(), $(window).resize(function() {
        a()
    })
});
