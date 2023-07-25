document.addEventListener("mousemove", function (e) {
  let img = document.getElementById("img");
  img.style.position = "relative";
  img.style.top = e.clientY + "px";
  img.style.left = e.clientX + "px";
});
