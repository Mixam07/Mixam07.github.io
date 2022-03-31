"use strict";
document.addEventListener("DOMContentLoaded", async function() {
  const sliderCarrousel = document.querySelector(".slider__carrousel"),
        sliderWindow = document.querySelector(".slider__window") || true,
        sliderItems = document.querySelectorAll(".slider__item"),
        arrowLeft = document.querySelector(".arrow_left"),
        arrowRight = document.querySelector(".arrow_right"),
        today = document.querySelector(".footer__today"),
        todayDate = new Date(),
        todayDay =  (todayDate.getDate() < 10) ? "0" + todayDate.getDate() : todayDate.getDate(),
        todayMonth = ((todayDate.getMonth() + 1) < 10) ? "0" + (todayDate.getMonth() + 1): todayDate.getMonth() + 1,
        leagueButtons = document.querySelectorAll(".description__button"),
        table = document.querySelector(".table"),
        bestPlayers = document.querySelector(".best");
  
  let widthItem, marginRightItem, widthSlider, timer = true,widthScreenPX = window.clientWidth;

  function carouselMovement(e, widthItem, marginRightItem, lastPosition){
    e.preventDefault();
    
    //Провіряє чи слайдер в русі, якщо ні то перегортає
    if(timer){
      sliderCarrousel.style.left = `${lastPosition - widthItem - marginRightItem}px`;
      timer = false;
      setTimeout(() => timer = true, 500);
    }
  }

  if(sliderWindow !== true){
    function addWidthItems(itemInSlider = 4) {
      widthSlider = sliderWindow.clientWidth;
      marginRightItem = +(window.getComputedStyle(sliderItems[0]).marginRight.replace("px", ""));
      widthItem = ((widthSlider + marginRightItem) / itemInSlider) - marginRightItem;
  
      sliderCarrousel.style.left = `0px`;
      
      sliderItems.forEach(item => {
        item.style.width = `${widthItem}px`;
      });
    }

    function countItemsInSlider() {
      const widthScreenREM =  widthScreenPX / +(window.getComputedStyle(document.querySelector("body")).fontSize.replace("px", ""));
      //console.log(widthScreenREM);
      //console.log(+(window.getComputedStyle(document.querySelector("body")).fontSize.replace("px", "")));
      //console.log(widthScreen / +(window.getComputedStyle(document.querySelector("body")).fontSize.replace("px", "")));
      if(widthScreenREM > 47.625){
        addWidthItems(8);
      }else if(widthScreenREM > 36){
        addWidthItems(7);
      }else if(widthScreenREM > 31.25){
        addWidthItems(6);
      }else if(widthScreenREM > 25.6){
        addWidthItems(5);
      }else {
        addWidthItems();
      }
    }
  
    window.addEventListener("resize", () => {
      if(widthScreenPX !== window.outerWidth){
        widthScreenPX = window.outerWidth;
  
        countItemsInSlider();
      }
    });

    countItemsInSlider();
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

  try{
    today.innerHTML = `${todayDay}.${todayMonth}.${todayDate.getFullYear()}`;
  }catch(e){}

  try{
    console.log(leagueButtons);
    leagueButtons[0].addEventListener("click", () => {
      table.classList.add("table_active");
      bestPlayers.classList.remove("best_active");
    });

    leagueButtons[1].addEventListener("click", () => {
      table.classList.remove("table_active");
      bestPlayers.classList.add("best_active");
    });
  }catch(e){}
});