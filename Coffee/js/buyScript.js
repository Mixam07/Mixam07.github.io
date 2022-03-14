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
          <th class="buy__row row_main description">Description</th>
          <th class="buy__row row_main price">Price<span class="number_element"><span class="slash">/</span>Number</span></th>
          <th class="buy__row row_main number">Number</th>
          <th class="buy__row row_main"></th>
        </tr>
        `;

        elements.forEach((item, i) => {
          if(!!activeElements[i + 1]){
            sum += +item.sum * +activeElements[i + 1];
            parentTable.innerHTML += `
            <tr data-index=${i + 1} class="buy__column">
              <td class="buy__row">${item.title}</td>
              <td class="buy__row description">${item.subtitle}</td>
              <td class="buy__row price">${item.sum}<span class="dollar">$</span><span class="number_element"><span class="slash">/</span>${activeElements[i + 1]}</span></td>
              <td class="buy__row number">${activeElements[i + 1]}</td>
              <td data-delete class="buy__row"><img src="icons/deleteImg.svg" alt="deleteImg"></td>
            </tr>
            `;
          }
        });

        parentTable.innerHTML += `
        <tr class="buy__column">
          <td class="buy__row"></td>
          <td class="buy__row description"></td>
          <td class="buy__row price">${sum.toFixed(2)}<span class="dollar">$</span><span class="number_element"><span class="slash">/</span>${number}</span></td>
          <td class="buy__row number">${number}</td>
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
          counter = document.querySelectorAll("[data-number]"),
          canvas = document.querySelector(".canvas"),
          menu = document.querySelector(".menu"),
          arrows = document.querySelectorAll(".arrow"),
          footerTitles = document.querySelectorAll("[data-footerTitles]"),
          close = document.querySelector(".menu__close"),
          burgerMenu = document.querySelector(".header__burgerMenu");
    

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

    footerTitles.forEach((item, i) => {
      item.addEventListener("click", () => {
        if(window.outerWidth <= 560){
          item.parentElement.children[1].classList.toggle("footer__subtitle_active");
          arrows[i].classList.toggle("bottom");
        }
      });
    });

    search.forEach((item, i) => {
      item.addEventListener("click", () => {
        input[i].classList.toggle("input_active");
        input[i].value = "";
      });
    });

    function addNavs(parent, parentClass) {
      parent.innerHTML = `
        <a href="index.html" class="${parentClass}__item">Home</a>
        <a href="#" class="${parentClass}__item">About Us</a>
        <a href="#" class="${parentClass}__item">Menu</a>
        <a href="index.html#review" class="${parentClass}__item">Review</a>
        <a href="index.html#contact" class="${parentClass}__item">Contact</a>
      `;
    }

    account();
    addNavs(document.querySelector(".header__nav"), "header");
    addNavs(document.querySelector(".menu__nav"), "menu");
  });
});