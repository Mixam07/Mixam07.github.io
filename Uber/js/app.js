function onClick(e){
  if (e == "first"){
    document.querySelector(".header__menu_first").style.display = "none";
    document.querySelector(".burger_menu__nav").style.display = "block";
  }else if(e == "second"){
    if (window.innerWidth > 1080) {
    }else{
      document.querySelector(".header__menu_first").style.display = 'block';
    }
    document.querySelector(".burger_menu__nav").style.display = "none";
  }
}