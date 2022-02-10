window.addEventListener("DOMContentLoaded", function() {
  fetch("db.json")
  .then(element => {
    return element.json();
  })
  .then(items => {
    const elements = items.slider,
          parentTable = document.querySelector(".buy__table");

    function deleteElement() {
      const deleteButtons = document.querySelectorAll("[data-delete]");
      deleteButtons.forEach((element, i) => {
        element.addEventListener("click", () => {
          const activeElements = JSON.parse(localStorage.getItem("items")),
                number = localStorage.getItem("numberElement"),
                index = parentTable.children[i + 1].children[0].dataset.index,
                numberElement = activeElements[index];

          delete activeElements[index];

          localStorage.setItem("numberElement",JSON.stringify(+number - +numberElement));
          localStorage.setItem("items",JSON.stringify(activeElements));

          parentTable.innerHTML = "";
          
          creatTable();
        });
      });
    }

    function creatTable() {
      if(localStorage.getItem("numberElement") && localStorage.getItem("items")){
        const activeElements = JSON.parse(localStorage.getItem("items")),
              number = localStorage.getItem("numberElement");
        let sum = 0;

        parentTable.innerHTML = `
        <tr class="buy__column">
          <th class="buy__row row_main">Name</th>
          <th class="buy__row row_main">Description</th>
          <th class="buy__row row_main">Price</th>
          <th class="buy__row row_main">Number</th>
          <th class="buy__row row_main"></th>
        </tr>
        `;

        elements.forEach((item, i) => {
          if(!!activeElements[i + 1]){
            sum += +item.sum * +activeElements[i + 1];
            parentTable.innerHTML += `
            <tr data-index=${i + 1} class="buy__column">
              <td class="buy__row">${item.title}</td>
              <td class="buy__row">${item.subtitle}</td>
              <td class="buy__row">${item.sum}<span>$</span></td>
              <td class="buy__row">${activeElements[i + 1]}</td>
              <td data-delete class="buy__row"><img src="icons/deleteImg.svg" alt="deleteImg"></td>
            </tr>
            `;
          }
        });

        parentTable.innerHTML += `
        <tr class="buy__column">
          <td class="buy__row"></td>
          <td class="buy__row"></td>
          <td class="buy__row">${sum}<span>$</span></td>
          <td class="buy__row">${number}</td>
          <td class="buy__row"></td>
        </tr>
        `;

        deleteElement();
      }
    }
    
    creatTable();
  })
  .finally(() => {
    const search = document.querySelectorAll("[data-search]"),
          input = document.querySelectorAll(".header__input, .menu__input"),
          subtractButtons = document.querySelectorAll("[data-subtract]"),
          buttons = document.querySelectorAll("[data-btn]"),
          counter = document.querySelectorAll("[data-number]"),
          leftButton = document.querySelector("[data-left]"),
          addButtons = document.querySelectorAll("[data-add]"),
          //marginRight = parseInt(window.getComputedStyle(document.querySelector(".offers__item")).marginRight) && "",
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
      const itemsSlider = document.querySelector(".offers__items"),
            positionLeft = parseInt(window.getComputedStyle(itemsSlider).left),
            widthSlider = document.querySelector(".offers__body").offsetWidth,
            numberTimes = Math.ceil(parseInt(window.getComputedStyle(itemsSlider).width) / (widthSlider + marginRight)) - 1;
          
      if(positionLeft == 0){
        leftButton.classList.add("transparent");
      }
      if(positionLeft == -((widthSlider + marginRight) * numberTimes)){
        rightButton.classList.add("transparent");
      }
    }

    function addNavs(parent, parentClass) {
      parent.innerHTML = `
        <a href="#" class="${parentClass}__item">Home</a>
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
    //addButtonEvent(subtractButtons, -1);
    //addButtonEvent(addButtons, 1);
    //addClass();
    addNavs(document.querySelector(".header__nav"), "header");
    addNavs(document.querySelector(".menu__nav"), "menu")

    /*
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
    */
  });
});