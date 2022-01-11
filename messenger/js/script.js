window.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".panel"),
        button = form.querySelector(".panel__button"),
        screen = document.querySelector(".screen__ul");
  
  createMesseng ();
    
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let i = localStorage.getItem("number") || 0;
    i++;
    let text = form.querySelector(".panel__text").value,
        name = form.querySelector(".panel__input").value;
    form.reset();
    let Info = {
      name: name,
      text: text
    }
    localStorage.setItem(`${i}`,JSON.stringify(Info));
    localStorage.setItem("number", i);
    createMesseng ();
  });

  function createMesseng () {
    if(localStorage.getItem("number")){
      let length = +localStorage.getItem("number");
      screen.innerHTML = "";
      for(let i = 1;i <= length;i++){
        let element = JSON.parse(localStorage.getItem(`${i}`));
        console.log(element.text);
        console.log(element.name);
        screen.innerHTML += `
        <li class="screen__li">
          <div class="screen__name">${element.name}</div>
          <div class="screen__text">${element.text}</div>
        </li>`;
      }
    }
  }
});