"use strict";
document.addEventListener("DOMContentLoaded", function() {
  const sliderCarrousel = document.querySelector(".slider__carrousel"),
        sliderWindow = document.querySelector(".slider__window"),
        sliderItems = document.querySelectorAll(".slider__item"),
        arrowLeft = document.querySelector(".arrow_left"),
        arrowRight = document.querySelector(".arrow_right");
  
  let widthItem, marginRightItem, widthSlider,widthScreen = window.outerWidth, timer = true;


  countItemsInSlider();

  function countItemsInSlider() {
    if(widthScreen > 992){
      addWidthItems(10);
    }else if(widthScreen > 762){
      addWidthItems(8);
    }else if(widthScreen > 600){
      addWidthItems(6);
    }else if(widthScreen > 425){
      addWidthItems(5);
    }else {
      addWidthItems();
    }
  }

  window.addEventListener("resize", () => {
    if(widthScreen !== window.outerWidth){
      widthScreen = window.outerWidth;

      countItemsInSlider();
    }
  });

  function addWidthItems(itemInSlider = 4) {
    widthSlider = sliderWindow.clientWidth;
    marginRightItem = +(window.getComputedStyle(sliderItems[0]).marginRight.replace("px", ""));
    widthItem = ((widthSlider + marginRightItem) / itemInSlider) - marginRightItem;

    sliderCarrousel.style.left = `0px`;

    sliderItems.forEach(item => {
      item.style.width = `${widthItem}px`;
    });
  }

  function carouselMovement(e, widthItem, marginRightItem, lastPosition){
    e.preventDefault();
    
    //Провіряє чи слайдер в русі, якщо ні то перегортає
    if(timer){
      sliderCarrousel.style.left = `${lastPosition - widthItem - marginRightItem}px`;
      timer = false;
      setTimeout(() => timer = true, 500);
    }
  }

  try{
    arrowRight.addEventListener("click", (e)=> {
      const lastPosition = +(window.getComputedStyle(sliderCarrousel).left.replace("px", ""));
      if(lastPosition !== -(((widthItem + marginRightItem) * (sliderItems.length)) - marginRightItem - widthSlider)){
        carouselMovement(e, widthItem, marginRightItem, lastPosition);
      }
    });
    arrowLeft.addEventListener("click", (e)=> {
      const lastPosition = +(window.getComputedStyle(sliderCarrousel).left.replace("px", ""));
      if(lastPosition < 0){
        carouselMovement(e, - widthItem, - marginRightItem, lastPosition);
      }
    });
  }catch(e){}
});