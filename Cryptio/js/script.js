$(document).ready(function(){
  new WOW().init();
});

const humburger = document.querySelector(".header__hamburger"),
      closeElem = document.querySelector(".menu__close"),
      canvas = document.querySelector(".canvas");

humburger.addEventListener("click", () => {
  canvas.classList.add("canvas__active");
});

closeElem.addEventListener("click", () => {
  canvas.classList.remove("canvas__active");
});

canvas.addEventListener("click", () => {
  canvas.classList.remove("canvas__active");
});