let navItemWidth = $(".nav-item").innerWidth();
$(".nav").animate({ left: `-${navItemWidth}` });
let flag = true;
$("#open,.nav-item i,.navs a").click(() => {
  if (flag) {
    $(".nav").animate({ left: 0 }, 1000);
    flag = false;
  } else {
    $(".nav").animate({ left: `-${navItemWidth}` }, 1000);
    flag = true;
  }
});
$("#duration p").slideUp();
$("#duration h3").click(function () {
  $("#duration p").not($(this).next()).slideUp(1000);
  $(this).next().slideToggle(1000);
});

let countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

let x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.querySelector("#days").innerHTML = `${days} d`;
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.querySelector("#hours").innerHTML = `${hours} h`;
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  document.querySelector("#minutes").innerHTML = `${minutes} m`;
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.querySelector("#seconds").innerHTML = `${seconds} s`;
}, 1000);
$("textarea").keyup(function () {
  let length = $(this).val().length;
  let remin = 100 - length;
  if (remin <= 0) {
    $("#remin").text("your available character finished");
  } else {
    $("#remin").text(remin);
  }
});
