let aboutOffsetTop = $("#about").offset().top;
$(window).scroll(function () {
  navbarScroll();
});
function navbarScroll() {
  let scrollTop = $(window).scrollTop();
  if (scrollTop > aboutOffsetTop - 50) {
    $("#navbar-example").css("backgroundColor", "#999999");
    $("#btnUp").fadeIn(1000);
  } else {
    $("#navbar-example").css("backgroundColor", "white");
    $("#btnUp").fadeOut(1000);
  }
}
navbarScroll();

$("#btnUp").click(() => {
  // $(window).scrollTop(0);
  $("html,body").animate({ scrollTop: 0 }, 1000, () => {
    new WOW().init();
  });
});

$(".nav-item a[href^='#']").click(function () {
  let aHref = $(this).attr("href");
  let offset = $(aHref).offset().top;
  $("li a").removeClass("active");
  $(this).addClass("active");
  $("html,body").animate({ scrollTop: offset }, 1000);
});

$(".box .box-color .colors div").click(function () {
  let bgColor = $(this).css("backgroundColor");
  $("h1 ,h2,h3,h4,h5,h6,p,span").css("color", bgColor);
  localStorage.setItem("theme", bgColor);
});
if (localStorage.getItem("theme")) {
  $("h1 ,h2,h3,h4,h5,h6,p,span").css("color", localStorage.getItem("theme"));
}

let colorsBoxWidth = $(".box-color").outerWidth();
$(".box").animate({ left: `-${colorsBoxWidth}` });

let flag = true;
$("#close").click(() => {
  if (flag) {
    $(".box").animate({ left: 0 }, 1000);
    flag = false;
  } else {
    $(".box").animate({ left: `-${colorsBoxWidth}` }, 1000);
    flag = true;
  }
});
$(document).ready(function () {
  $("#spinner").fadeOut(1000, () => {
    $("body").css("overflow", "auto");
  });
});
new WOW().init();
var typed = new Typed(".element", {
  strings: ["I'm Developer.", "I'm Designer."],
  typeSpeed: 100,
  // smartBackSpace: true,
});
