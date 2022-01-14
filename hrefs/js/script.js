window.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".form"),
        buttonShow = form.querySelector(".form__button_show"),
        buttonSend = form.querySelector(".form__button"),
        parentElement = document.querySelector(".hrefs");

  buttonShow.addEventListener("click", () => {
    form.classList.toggle("form_active");
  });

  form.querySelector("[data-href]").addEventListener("click", (e) => {
    let value = e.target.value;
    if(/https:\/\//.test(value))value = value.slice(8 ,value.length);
    e.target.value = `https://${value}`;
  });

  buttonSend.addEventListener("click", () => {
    const name = form.querySelector("[data-name]").value,
          descr = form.querySelector("[data-descr]").value,
          href = form.querySelector("[data-href]").value;

    const object = {
      name: name,
      descr: descr,
      href: href
    }
    
    if(!localStorage.getItem("hrefs")){
      const arr = [];
      arr.push(object);
      localStorage.setItem("hrefs", JSON.stringify(arr));
      buldEvent();
    }else{
      const arr = JSON.parse(localStorage.getItem("hrefs"));
      arr.push(object);
      localStorage.setItem("hrefs", JSON.stringify(arr));
      buldEvent();
    }
    form.querySelectorAll("input").forEach(item => {
      item.value = "";
    });
  });

  function buldEvent() {
    if(localStorage.getItem("hrefs")){
      let hrefs = JSON.parse(localStorage.getItem("hrefs"));
      parentElement.innerHTML = "";
      for(let key in hrefs){
        parentElement.innerHTML += `
        <div class="hrefs__item">
          <div class="hrefs__wrapper">
            <a class="hrefs__name" href="${hrefs[key].href}">${hrefs[key].name}</a>
            <div class="hrefs__desc">${hrefs[key].descr}</div>
          </div>
          <div class="hrefs__remove">
            <img class="hrefs__delete" src="icons/deleteImg.svg" alt="delete">
          </div>
        </div>
        `;
      }
    }
    givEvent();
  }

  function givEvent() {
    const buttonDelete = document.querySelectorAll(".hrefs__delete");

    buttonDelete.forEach((item, i) => {
      item.addEventListener("click", () => {
        const object = JSON.parse(localStorage.getItem('hrefs')),
              newArr = [];

        delete object[i];

        for(let key in object){
          if(object[key]){
            newArr.push(object[key]);
          }
        };

        localStorage.setItem("hrefs", JSON.stringify(newArr));
        buldEvent();
      });
    });
  }

  buldEvent();
});