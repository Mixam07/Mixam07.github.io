$(document).ready(function(){
  $('.slider__inner').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
    responsive: [
      {
        breakpoint: 700,
        settings: {
          infinite: true,
          prevArrow: false,
          nextArrow: false
        }
      }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
    $(this)
      .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
      .closest('div.catalog__container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item){
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      })
    })
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');
  
  function valideForms (form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста,введите свое имя",
        phone: "Пожалуйста,введите свой номер телефона",
        email: {
          required: "Пожалуйста,введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }
  valideForms(".form__form");
  valideForms(".consultation__form");

  $("input[name=phone]").mask("+380(99)99-99-999");


  $(window).scroll(function(){
    if($(this).scrollTop() > 1600){
      $(".pageup").fadeIn();
    }else{
      $(".pageup").fadeOut();
    }
  });

  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});

function consultation (name,text){
  document.querySelector(".background").style.display = "block";
    document.querySelector(".form").style.display = "block";
  if(name == "consultation"){
    document.querySelector(".form__title").innerHTML = "Просто заполните форму заявки";
    document.querySelector(".form__subtitle").innerHTML = "и мы перезвоним вам в течении 10 мину";
    return
  }
  if(name == "goods"){
    document.querySelector(".form__title").innerHTML = "Ваш заказ:";
    document.querySelector(".form__subtitle").innerHTML = `${text}`;
    return
  }
}

function exit(){
  document.querySelector(".background").style.display = "none";
  document.querySelector(".form").style.display = "none";
  document.querySelector(".last").style.display = "none";
}

function last(where){
  let form__inputs =  document.querySelectorAll(".form__input");
  let consultation__inputs =  document.querySelectorAll(".consultation__input");
  if (where == "form"){
    if (form__inputs[0].value == "" || form__inputs[1].value == "" || form__inputs[2].value == ""){
      return
    }
  }
  if (where == "body"){
    if (consultation__inputs[0].value == "" || consultation__inputs[1].value == "" || consultation__inputs[2].value == ""){
      return
    }
  }
  document.querySelector(".background").style.display = "block";
  document.querySelector(".form").style.display = "none";
  document.querySelector(".last").style.display = "block";
  consultation__inputs.forEach(function(i){
    i.value = "";
  })
  form__inputs.forEach(function(i){
    i.value = "";
  })
}