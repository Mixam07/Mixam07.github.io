window.addEventListener("DOMContentLoaded", function() {
  fetch("db.json")
  .then(element => {
    return element.json();
  })
  .then(item => {
    item.slider.forEach(({img, sum, title, subtitle}) => {
      document.querySelector(".offers__items").innerHTML += `
        <div class="offers__item">
        <div class="offers__img"><img src="${img}" alt="photo"></div>
        <div class="offers__sum"><span>$</span>${sum}</div>
        <h3 class="title title_photo">${title}</h3>
        <h4 class="subtitle subtitle_photo">${subtitle}</h4>
        <div class="offers__footer">
          <div class="offers__account">
            <div class="offers__number">0</div>
            <div class="offers__btns">
              <div data-add class="offers__button"></div>
              <div data-subtract class="offers__button"></div>
            </div>
          </div>
          <button data-btn class="btn btn_main">Get Delivery</button>
        </div>
      </div>
      `;
    });
  })
  .finally(() => {
    const search = document.querySelector(".header__search"),
          input = document.querySelector(".header__input"),
          subtractButtons = document.querySelectorAll("[data-subtract]"),
          buttons = document.querySelectorAll("[data-btn]"),
          counter = document.querySelector(".header__number"),
          itemsSlider = document.querySelector(".offers__items"),
          leftButton = document.querySelector("[data-left]"),
          addButtons = document.querySelectorAll("[data-add]"),
          marginRight = parseInt(window.getComputedStyle(itemsSlider).marginRight),
          rightButton = document.querySelector("[data-right]"),
          widthSlider = document.querySelector(".offers__body").offsetWidth;
      
    let counterSlider = 0;

    function account() {
      if(!!localStorage.getItem('numberElement')){
        counter.classList.add("header__number_active");
        counter.textContent = `${JSON.parse(localStorage.getItem('numberElement'))}`;
      }
    }

    search.addEventListener("click", () => {
      input.classList.toggle("header__input_active");
      input.value = "";
    });

    function addButtonEvent(element, argumentNumber) {
      element.forEach((item, i) => {
        item.addEventListener("click", () => {
          let number = document.querySelectorAll(".offers__number")[i],
              sum = +number.textContent + argumentNumber;
          if (sum < 0){
            sum = 0;
          }else if(sum > 25){
            sum = 25
          }
          number.textContent = `${sum}`;
        });
      });
    }
  
    buttons.forEach((item, i) => {
      item.addEventListener("click", () => {
        let number = document.querySelectorAll(".offers__number")[i];
        if(!+number.textContent == 0){
          counter.classList.add("header__number_active");
          let numberElement;
  
          if(!!!localStorage.getItem('numberElement')){
            numberElement = +number.textContent;
          }else{
            numberElement = JSON.parse(localStorage.getItem('numberElement'));
            numberElement += +number.textContent;
          }
  
          if(!!!localStorage.getItem('items')){
            const object = {
              [i + 1] : +number.textContent,
            }
          }else{
            const object = JSON.parse(localStorage.getItem('items'));
            if(object[i + 1]){
              object[i + 1] = object[i + 1] + +number.textContent;
            }else{
              object[i + 1] = +number.textContent;
            }
          }
  
          counter.textContent = `${numberElement}`;
          number.textContent = "0";
          localStorage.setItem('items', JSON.stringify(object));
          localStorage.setItem('numberElement', JSON.stringify(numberElement));
        }
      });
    });

    function addClass() {
      const positionLeft = parseInt(window.getComputedStyle(itemsSlider).left),
            numberTimes = Math.ceil(parseInt(window.getComputedStyle(itemsSlider).width) / (widthSlider + marginRight)) - 1;
          
      if(positionLeft == 0){
        leftButton.classList.add("transparent");
      }
      if(positionLeft == -((widthSlider + marginRight) * numberTimes)){
        rightButton.classList.add("transparent");
      }
    }

    function createEvents(element, fun) {
      element.addEventListener('click', () => {
        const positionLeft = parseInt(window.getComputedStyle(itemsSlider).left),
              numberTimes = Math.ceil(parseInt(window.getComputedStyle(itemsSlider).width) / (widthSlider + marginRight)) - 1;
        
        if(positionLeft == -((widthSlider + marginRight) * counterSlider)){
          fun(itemsSlider, positionLeft, marginRight, numberTimes);
        }
      });
    }

    account();
    addButtonEvent(subtractButtons, -1);
    addButtonEvent(addButtons, 1);
    addClass();

    createEvents(rightButton, (itemsSlider, positionLeft, marginRight, numberTimes) => {
      if(positionLeft !== -(widthSlider * numberTimes) - numberTimes * marginRight){
        itemsSlider.style.left = `${positionLeft - widthSlider - marginRight}px`;
        counterSlider++;
        leftButton.classList.remove("transparent");
        if(positionLeft == -((widthSlider + marginRight) * (numberTimes - 1))){
          rightButton.classList.add("transparent");
        }
      }
    });

    createEvents(leftButton, (itemsSlider, positionLeft, marginRight) => {
      if(positionLeft !== 0){
        itemsSlider.style.left = `${positionLeft + widthSlider + marginRight}px`;
        counterSlider--;
        rightButton.classList.remove("transparent");
        if(positionLeft == -(widthSlider + marginRight)){
          leftButton.classList.add("transparent");
        }
      }
    });
  });
});