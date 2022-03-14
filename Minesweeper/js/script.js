"use strict";
window.addEventListener("DOMContentLoaded", function () {
  const switchElement = document.querySelector(".main__wrapper"),
        fieldElements = document.querySelectorAll(".main__item"),
        wrapper = document.querySelector(".main__wrapper"),
        width = 10,
        canvas = document.querySelector(".canvas"),
        settingButton = document.querySelector(".main__gear"),
        windowClose = document.querySelector("[data-windowClose]"),
        setting = document.querySelector(".setting"),
        settingClose = document.querySelector("[data-settingClose]"),
        popUpWindow = document.querySelector(".window"),
        textLose = document.querySelector(".lose"),
        textWin = document.querySelector(".win"),
        numberAll = document.querySelector(".numberAll"),
        numberFound = document.querySelector(".numberFound"),
        counter = document.querySelector(".main__counter"),
        newGameButton = document.querySelector("[data-newGame]"),
        difficultyInputs = document.querySelectorAll(".setting__item>input");

  let openPositions = [],
      orderTasks = [],
      s = 0,
      numberBombs = localStorage.getItem('numberBombs')? JSON.parse(localStorage.getItem('numberBombs')) : 30;

  counter.textContent = `${numberBombs}`;

  switchElement.addEventListener("click", () => {
    switchElement.classList.toggle("bomb");
    switchElement.classList.toggle("flag");
  });

  //Очистка поля
  function fieldCleaning() {
    openPositions = [];
    s = 0;
    counter.textContent = `${numberBombs}`;
    fieldElements.forEach(item => {
      item.innerHTML = "";
      item.classList.add("hidden");
      item.classList.remove("flag_field");
      item.style.backgroundColor = "#fff";
    });
  }

  //Провіряє чи є ця позиція в масіві
  function checkItem(array, elementForVerification) {
    return array.some(item => item == elementForVerification)
  }

  //Відкриває всі позиції
  function openAllfield() {
    let numberFoundBombs = 0;

    fieldElements.forEach(element => {
      element.classList.remove("hidden");

      if(element.classList.contains("flag_field")){
        element.style.backgroundColor = "red";
        numberFoundBombs++;
      }
    });

    numberFound.textContent = `${numberFoundBombs}`;
  }

  //Взнає позицію елемента но x кординаті
  function trackingPosition(position) {
      if(width < position) {
        position -= width;
        return trackingPosition(position)
      }
      return position
  }

  //Вищитує позиції навколо заданого елемента
  function countPositionsAround(position, positionXOnTheField) {
    if(positionXOnTheField == 1){
      return [position - 11, position - 10,position, position + 10, position + 9].filter(item => {return item >= 0 && item < 200})
    }else if(positionXOnTheField == 10){
      return [position- 11, position + 9,position + 8, position - 2, position - 12].filter(item => {return item >= 0 && item < 200})
    }else{
      return [position - 11, position - 10, position, position + 10, position + 9, position + 8, position - 2, position - 12].filter(item => {return item >= 0 && item < 200})
    }
  }

  //Відкритя всіх пустих позицій коло доторку
  function voidInspection(i) {
    const positionsAroundEmptiness = countPositionsAround(i + 1, trackingPosition(i + 1));

    positionsAroundEmptiness.forEach(item => {
      if(!fieldElements[item].classList.contains("flag_field")){
        fieldElements[item].classList.remove("hidden");

        if(!checkItem(openPositions, item)){
          if(fieldElements[item].innerHTML == ""){
            orderTasks.push(item);
          }
          openPositions.push(item);
        }
        
      }
    });

    orderTasks.forEach(item => {
      orderTasks.shift();

      voidInspection(item);
    });
  }

  //Додає колір ціфрам
  function addColorNumber(item) {
    const number = +item.innerHTML;

    switch(number){
      case 1:
        item.style.color = "#0582FF";
      break;
      case 2:
        item.style.color = "green";
      break;
      case 3:
        item.style.color = "red";
      break;
      case 4:
        item.style.color = "#000474";
      break;
      case 5:
        item.style.color = "#EB6448";
      break;
      case 6:
        item.style.color = "#00EBA1";
      break;
      case 7:
        item.style.color = "#EBDB00";
      break;
      case 8:
        item.style.color = "#000";
      break;
    }
  }

  //Розставляє числа вокруг мін
  function placementNumbersAroundBomb(arrayPositionBombs) {
    arrayPositionBombs.forEach(element => {
      const positionsAroundBomb = countPositionsAround(element, trackingPosition(element));
      
      positionsAroundBomb.forEach(item => {
        if(item >= 0 && item < 200){
          let lastNumberInFeid = fieldElements[item].innerHTML;

          if(!/\</.test(lastNumberInFeid)){
            fieldElements[item].innerHTML = `${+lastNumberInFeid + 1}`;
          }
          addColorNumber(fieldElements[item]);
        }
      });
      
    });
  }

  //Розтавляє міни
  function placementBombs(numberBombs, touchPosition) {
    const positionsAroundTouch = countPositionsAround(touchPosition, trackingPosition(touchPosition));

    positionsAroundTouch.push(touchPosition - 1);

    let arrayPositionBombs = [];
    for(let i = 0;i < numberBombs;i++){
      const randomPosition = Math.ceil(Math.random() * 200);

      if(!checkItem(positionsAroundTouch, randomPosition - 1)){
        if(!isNaN(fieldElements[randomPosition - 1].innerHTML) || fieldElements[randomPosition - 1].innerHTML == "" ){
          fieldElements[randomPosition - 1].innerHTML = "<img src='icons/bomb.svg' alt='bomb' height='30px'>";

          arrayPositionBombs.push(randomPosition);
        }else i--
      }else i--
    }

    //Розставлення чисел біля бомб
    placementNumbersAroundBomb(arrayPositionBombs);
  }

  windowClose.addEventListener("click", () => {
    canvas.style.transition = "0.5s opacity, 2s z-index";
    canvas.classList.remove("canvas_active");
    popUpWindow.classList.remove("window_active");
    textLose.classList.remove("lose_active");
    textWin.classList.remove("win_active");
  });

  settingClose.addEventListener("click", () => {
    canvas.style.transition = "0.5s opacity, 2s z-index";
    canvas.classList.remove("canvas_active");
    setting.classList.remove("setting_active");
  });

  settingButton.addEventListener("click", () => {
    canvas.style.transition = "0.5s opacity";
    canvas.classList.add("canvas_active");
    setting.classList.add("setting_active");
  });

  difficultyInputs.forEach(item => {
    item.addEventListener("change", () => {
      difficultyInputs.forEach(element => {
        if(element.checked){
          localStorage.setItem("numberBombs", element.value);
          numberBombs = +element.value;
        }
      });

      fieldCleaning();
    });
  });

  newGameButton.addEventListener("click", () => {fieldCleaning()});

  fieldElements.forEach((item, i) => {
    item.addEventListener("click", () => {
      if(openPositions.length + numberBombs  < 200){
        if(wrapper.classList.contains("flag") && counter.textContent >= 0 && item.classList.contains("hidden")){
          item.classList.toggle("flag_field");
  
          if(item.classList.contains("flag_field")){
            if(counter.textContent > 0){
              counter.textContent = +counter.textContent - 1;
            }
          }else{
            counter.textContent = +counter.textContent + 1;
          }
        }else if(wrapper.classList.contains("bomb")){
          
          //Якщо немає флага відкриває тереторію
          if(!item.classList.contains("flag_field")){
            if(s == 0) {
              s++;
              placementBombs(numberBombs, i + 1);
            }
            
            item.classList.remove("hidden");
            if(!checkItem(openPositions, i)){
              openPositions.push(i);
            }
            
            if(item.innerHTML == ""){
              voidInspection (i);
            }
  
            //Якщо попали на бомбу і якщо виграв
            if(/\</.test(item.innerHTML) || openPositions.length + numberBombs  == 200){
              counter.textContent = 0;
  
              canvas.style.transition = "0.5s opacity";
              canvas.classList.add("canvas_active");
              popUpWindow.classList.add("window_active");
              numberAll.textContent = `${numberBombs}`;
  
              //Якщо попали на бомбу
              if(/\</.test(item.innerHTML)){
                textLose.classList.add("lose_active");
              }

              //Якщо виграв
              if(openPositions.length + numberBombs  == 200){
                textWin.classList.add("win_active");
              }

              openPositions.length = 200 - numberBombs;
              openAllfield();
            }
          }
        }
      }
    });
  });
});