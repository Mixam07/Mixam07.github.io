"use strict";
window.addEventListener("DOMContentLoaded", async function() {
  const showElement = document.querySelector(".up");

  showElement.classList.add("animated");

  function chechScroll() {
    if (document.documentElement.scrollTop > 700) {
      showElement.classList.remove('fadeOut');
      showElement.classList.add('fadeIn');
    } else {
      showElement.classList.remove('fadeIn');
      showElement.classList.add('fadeOut');
    }
  }

  window.addEventListener('scroll', () => {
    chechScroll();
  });

  chechScroll();

  const scrolling = (upElement) => {
    const upElem = upElement,
          element = document.documentElement,
          body = document.body;
  
    const calcScroll = () => {
      upElem.addEventListener('click', function(event) {
        let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  
        if (this.hash !== '') {
          event.preventDefault();
          let hashElement = document.querySelector(this.hash),
              hashElementTop = 0;
          console.log(hashElement);
  
          while (hashElement.offsetParent) {
            hashElementTop += hashElement.offsetTop;
            hashElement = hashElement.offsetParent;
          }
  
          hashElementTop = Math.round(hashElementTop);
          smoothScroll(scrollTop, hashElementTop, this.hash);
        }
      });
    };
  
    const smoothScroll = (from, to, hash) => {
      let timeInterval = 1,
          prevScrollTop,
          speed;
  
      if (to > from) {
        speed = 15;
      } else {
        speed = -15;
      }
        
      let move = setInterval(function() {
        let scrollTop = Math.round(body.scrollTop || element.scrollTop);
  
        if (
          prevScrollTop === scrollTop ||
          (to > from && scrollTop >= to) ||
          (to < from && scrollTop <= to)
        ) {
          clearInterval(move);
          history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
        } else {
          body.scrollTop += speed;
          element.scrollTop += speed;
          prevScrollTop = scrollTop;
        }
      }, timeInterval);
    };
  
    calcScroll();
  };

  const slider = (itemsSelector, positionSelector) => {
    const items = document.querySelectorAll(itemsSelector),
          elementPosition = document.querySelector(positionSelector);

    let interval;

    let number = 0;

    elementPosition.innerHTML += "<div class='elements'></div>";

    items.forEach(item => {
      item.classList.add("animated");
      elementPosition.children[1].innerHTML += "<span class='elements__item'></span>";
    });

    const elementsActive = document.querySelectorAll(".elements__item");

    function showElement() {
      items.forEach((item, i) => {
        item.classList.remove("active");
        elementsActive[i].classList.remove("item_active")
      });

      items[number].classList.remove("fadeOut");
      items[number].classList.add("fadeIn");
  
      elementsActive[number].classList.add("item_active");
  
      items[number].classList.add("active");
    }

    function createInterval(){
      interval = setInterval(() => {
        items[number].classList.remove("fadeIn");
        items[number].classList.add("fadeOut");
  
        number++;
        
        if(number >= items.length){
          number = 0;
        }
  
        showElement();
      }, 5000);
    }

    elementsActive[0].parentNode.addEventListener("mouseover", () => {
      clearInterval(interval);
    });

    elementsActive[0].parentNode.addEventListener("mouseout", () => {
      createInterval();
    });

    elementsActive.forEach((item, i) => {
      item.addEventListener("click", () => {
        items[number].classList.remove("fadeIn");
        items[number].classList.add("fadeOut");

        number = i;

        showElement();
      });
    })

    createInterval();
    showElement();
  }

  const accordion = (itemsSelector, btnsSelector) => {
    const items = document.querySelectorAll(itemsSelector),
          btns = document.querySelectorAll(btnsSelector);

    items.forEach(item => {
      item.children[1].classList.add("animated");
    });

    function show(position){
      items.forEach((item, i) => {
        if(item.children[1].classList.contains("active") && i !== position){
          const inf = item.children[1],
                img = item.children[0].children[0];

          img.classList.remove("active_img");
          
          inf.classList.remove("fadeIn");
          inf.classList.add("fadeOut");

          setTimeout(() => {
            inf.classList.remove("active");
          }, 1000);
        }
      });

      if((position + 1)){
        const inf = items[position].children[1],
              img = items[position].children[0].children[0];

        img.classList.add("active_img");
        
        inf.classList.remove("fadeOut");
        inf.classList.add("active");
        inf.classList.add("fadeIn");
      }
    }

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        show(i);
      });
    });

    show();
  }

  const download = (triggers) => {
    const btns = document.querySelectorAll(triggers);

    function downloadItem(path, name) {
      const element = document.createElement('a');
    
      element.setAttribute('href', path);
      element.setAttribute('download', name);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    }
    
    function addEvent() {
      btns.forEach(item => {
        item.addEventListener('click', () => {
          const path = item.dataset.url,
                name = item.dataset.name;

          downloadItem(path, name);
        });
      });
    }

    addEvent();
  }

  const popup = (btnsSelector, popupSelector, itemsSelector) => {
    const btns = document.querySelectorAll(btnsSelector),
          popup = document.querySelector(popupSelector),
          items = document.querySelectorAll(itemsSelector);

    popup.classList.add("animated");

    function showItem(i){
      const classElement = btns[i].dataset.name;

      items.forEach(item => {
        if(item.classList.contains(classElement)){
          item.style.display = "block";
        }else{
          item.style.display = "none";
        }
      });
    }

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        popup.classList.remove("fadeOut");
        popup.classList.add("fadeIn");
        document.querySelector("body").style.overflow = "hidden";
        popup.style.display = "block";
        showItem(i);
      });
    });

    popup.addEventListener("click", (e) => {
      if(e.target && (e.target.innerHTML == "×" || (e.target.classList[0] == popup.classList[0] || e.target.classList[0] == "popup-info__container"))){
        popup.classList.remove("fadeIn");
        popup.classList.add("fadeOut");
        document.querySelector("body").style.overflow = "scroll";
        setTimeout(() => {
          popup.style.display = "none";
        }, 500);
      }
    });
  }

  const burgerMenu = document.querySelector(".nav__burger-menu"),
        popupWindow = document.querySelector(".popup"),
        close = document.querySelector(".popup-close");

  burgerMenu.addEventListener("click", () => {
    popupWindow.classList.add("popup_active");
  });

  close.addEventListener("click", () => {
    popupWindow.classList.remove("popup_active");
  });

  popupWindow.addEventListener("click", (e) => {
    if(e.target && e.target.classList.contains("popup")){
      popupWindow.classList.remove("popup_active");
    }
  });

  document.querySelectorAll('[href^="#"]').forEach(item => {
    scrolling(item);
  });

  slider(".background>img", ".header__container");
  accordion(".accordion__item", ".accordion__item .title");
  download("[data-url]");
  popup(".frameworks__item", ".popup-info", ".popup-info__item");
});