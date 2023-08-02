let images = Array.from(document.querySelectorAll(".item img"));
let imageTitle = document.getElementById("imageTitle");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let closeIcon = document.getElementById("close");
let imageContainer = document.getElementById("imageContainer");
let index = 0;
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function (e) {
    imageContainer.style.display = "flex";
    imageTitle.style.backgroundImage = `url(${e.target.src})`;
    index = images.indexOf(e.target);
  });
}
function closeBtn() {
  imageContainer.style.display = "none";
}
closeIcon.addEventListener("click", closeBtn);
document.addEventListener("keyup", function (e) {
  if (e.key == `Escape`) {
    closeBtn();
  }
  if (e.key == "ArrowRight") {
    nextImg();
  }
  if (e.key == "ArrowLeft") {
    prevImg();
  }
});
function nextImg() {
  imageTitle.style.backgroundImage = `url(${
    images[++index % images.length].src
  })`;
}
function prevImg() {
  index--;
  if (index == -1) {
    index = images.length - 1;
  }
  imageTitle.style.backgroundImage = `url(${images[index].src})`;
}
next.addEventListener("click", nextImg);
prev.addEventListener("click", prevImg);
//imageContainer.addEventListener("click", closeBtn);
