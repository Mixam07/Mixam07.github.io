"use strict";
document.addEventListener("DOMContentLoaded", function() {
  const sliderCarrousel = document.querySelector(".slider__carrousel"),
        sliderWindow = document.querySelector(".slider__window"),
        widthSlider = +(window.getComputedStyle(sliderWindow).width.replace(/\D/g, "")),
        sliderItems = document.querySelectorAll(".slider__item"),
        arrowLeft = document.querySelector(".arrow_left"),
        arrowRight = document.querySelector(".arrow_right"),
        marginRightItem = +(window.getComputedStyle(sliderItems[0]).marginRight.replace(/\D/g, "")),
        widthItem = ((widthSlider + marginRightItem) / 7) - marginRightItem;
  
  sliderItems.forEach(item => {
    item.style.width = `${widthItem}px`;
  });


  function carouselMovement(e, widthItem, marginRightItem){
    e.preventDefault();
    const lastPosition = +(window.getComputedStyle(sliderCarrousel).left.replace(/\D/g, ""));
  
    //Якщо не дойшли до кінця
    if(-lastPosition !== -(((widthItem + marginRightItem) * sliderItems.length)  - widthSlider - marginRightItem)){
      //Провіряє чи слайдер в русі, якщо ні то перегортає
      if(!/\./.test(lastPosition/(widthItem + marginRightItem))){
        sliderCarrousel.style.left = `-${lastPosition + widthItem + marginRightItem}px`;
      }
    }
  }

  try{
    arrowRight.addEventListener("click", (e)=> {
      carouselMovement(e, widthItem, marginRightItem);
    });
    arrowLeft.addEventListener("click", (e)=> {
      carouselMovement(e, - widthItem, - marginRightItem);
    });
  }catch(e){}
});