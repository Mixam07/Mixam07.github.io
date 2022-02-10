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
    const search = document.querySelectorAll("[data-search]"),
          input = document.querySelectorAll(".header__input, .menu__input"),
          subtractButtons = document.querySelectorAll("[data-subtract]"),
          buttons = document.querySelectorAll("[data-btn]"),
          counter = document.querySelectorAll("[data-number]"),
          leftButton = document.querySelector("[data-left]"),
          addButtons = document.querySelectorAll("[data-add]"),
          marginRight = parseInt(window.getComputedStyle(document.querySelector(".offers__item")).marginRight),
          rightButton = document.querySelector("[data-right]"),
          canvas = document.querySelector(".canvas"),
          menu = document.querySelector(".menu"),
          close = document.querySelector(".menu__close"),
          burgerMenu = document.querySelector(".header__burgerMenu");
      
    let counterSlider = 0;

    burgerMenu.addEventListener("click", () => {
      canvas.classList.add("canvas_active");
      menu.classList.add("menu_active");
    });

    close.addEventListener("click", () => {
      canvas.classList.remove("canvas_active");
      menu.classList.remove("menu_active");
    });

    canvas.addEventListener("click", () => {
      canvas.classList.remove("canvas_active");
      menu.classList.remove("menu_active");
    });

    function account() {
      if(!!localStorage.getItem('numberElement')){
        counter.forEach(item => {
          item.classList.add("number_active");
          item.textContent = `${JSON.parse(localStorage.getItem('numberElement'))}`;
        });
      }
    }

    search.forEach((item, i) => {
      item.addEventListener("click", () => {
        input[i].classList.toggle("input_active");
        input[i].value = "";
      });
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
          let numberElement,
              object;
  
          if(!!!localStorage.getItem('numberElement')){
            numberElement = +number.textContent;
          }else{
            numberElement = JSON.parse(localStorage.getItem('numberElement'));
            numberElement += +number.textContent;
          }
  
          if(!!!localStorage.getItem('items')){
            object = {
              [i + 1] : +number.textContent,
            }
          }else{
            object = JSON.parse(localStorage.getItem('items'));
            if(object[i + 1]){
              object[i + 1] = object[i + 1] + +number.textContent;
            }else{
              object[i + 1] = +number.textContent;
            }
          }
  
          counter.forEach(item => {
            item.classList.add("number_active");
            item.textContent = `${numberElement}`;
          });
          number.textContent = "0";
          localStorage.setItem('items', JSON.stringify(object));
          localStorage.setItem('numberElement', JSON.stringify(numberElement));
        }
      });
    });

    function addClass() {
      document.querySelector(".offers__items").style.left = `0px`;
      counterSlider = 0;

      const itemsSlider = document.querySelector(".offers__items"),
            positionLeft = parseInt(window.getComputedStyle(itemsSlider).left),
            widthSlider = document.querySelector(".offers__body").offsetWidth,
            numberTimes = Math.ceil(parseInt(window.getComputedStyle(itemsSlider).width) / (widthSlider + marginRight)) - 1;

      leftButton.classList.add("transparent");
      rightButton.classList.remove("transparent");
      if(0 == -((widthSlider + marginRight) * numberTimes)){
        rightButton.classList.add("transparent");
      }
    }

    function addNavs(parent, parentClass) {
      parent.innerHTML = `
        <a href="index.html" class="${parentClass}__item">Home</a>
        <a href="#" class="${parentClass}__item">About Us</a>
        <a href="#" class="${parentClass}__item">Menu</a>
        <a href="#" class="${parentClass}__item">Review</a>
        <a href="#" class="${parentClass}__item">Contact</a>
      `;
    }

    function createEvents(element, fun) {
      element.addEventListener('click', () => {
        const itemsSlider = document.querySelector(".offers__items"),
              positionLeft = parseInt(window.getComputedStyle(itemsSlider).left),
              widthSlider = document.querySelector(".offers__body").offsetWidth,
              numberTimes = Math.ceil(parseInt(window.getComputedStyle(itemsSlider).width) / (widthSlider + marginRight)) - 1;
        
        if(positionLeft == -((widthSlider + marginRight) * counterSlider)){
          fun(itemsSlider, positionLeft, widthSlider, numberTimes);
        }
      });
    }

    account();
    addButtonEvent(subtractButtons, -1);
    addButtonEvent(addButtons, 1);
    addClass();
    addNavs(document.querySelector(".header__nav"), "header");
    addNavs(document.querySelector(".menu__nav"), "menu")

    createEvents(rightButton, (itemsSlider, positionLeft, widthSlider, numberTimes) => {
      if(positionLeft !== -(widthSlider * numberTimes) - numberTimes * marginRight){
        itemsSlider.style.left = `${positionLeft - widthSlider - marginRight}px`;
        counterSlider++;
        leftButton.classList.remove("transparent");
        if(positionLeft == -((widthSlider + marginRight) * (numberTimes - 1))){
          rightButton.classList.add("transparent");
        }
      }
    });

    createEvents(leftButton, (itemsSlider, positionLeft, widthSlider, numberTimes) => {
      if(positionLeft !== 0){
        itemsSlider.style.left = `${positionLeft + widthSlider + marginRight}px`;
        counterSlider--;
        rightButton.classList.remove("transparent");
        if(positionLeft == -(widthSlider + marginRight)){
          leftButton.classList.add("transparent");
        }
      }
    });
    addEventListener("resize", () => {
      addClass();
    });
  });
});