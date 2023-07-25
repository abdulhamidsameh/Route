let closeArrow = document.getElementById("close");
closeArrow.addEventListener("click", btnClose);
let cont = document.getElementById("imageContainer");
let images = Array.from(document.querySelectorAll(".item img"));
let imageTitle = document.getElementById("imageTitle");
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function (e) {
    cont.style.display = "flex";
    imageTitle.style.backgroundImage = `url(${e.target.src})`;
  });
}

function btnClose() {
  cont.style.display = "none";
}
