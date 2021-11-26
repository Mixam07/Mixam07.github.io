//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
var
    x,
    a = 1,
    users = document.querySelector('.reviews__photos');


function onClick2(h) {
	document.querySelectorAll('.reviews__uzer').forEach(n => n.classList.remove('active__uzer'));
	document.querySelectorAll('.reviews__about').forEach(n => n.classList.remove('active__about'));
	document.querySelectorAll('.reviews__text').forEach(n => n.classList.remove('text__active'));
	if (h == "+") {
		a++;
		if (a == 6) {a = 1}
		centerActive();
		calculate();
		
	}else if (h == "-") {
		a--;
		if (a == 0) {a = 5}
		centerActive();
		calculate();
	}
}
function calculate() {
	x = a;
	for (var i = 0; i < users.childElementCount; i++) {
		if (x > 5) {
			function funTrue() {
        x -= 5;
        if (x > 5) {
          funTrue();
        }
      }
	    funTrue();
	    }
	    document.querySelectorAll('.reviews__uzer')[i].style.order = `${x}`;
	    x++;
    }
}
function centerActive(){
	switch(a) {
		case 1:
		    document.querySelectorAll('.reviews__text')[2].classList.add('text__active');
		    document.querySelectorAll('.reviews__about')[2].classList.add('active__about');
		    document.querySelectorAll('.reviews__uzer')[2].classList.add('active__uzer');
		break;
		case 2:
		    document.querySelectorAll('.reviews__text')[1].classList.add('text__active');
		    document.querySelectorAll('.reviews__about')[1].classList.add('active__about');
		    document.querySelectorAll('.reviews__uzer')[1].classList.add('active__uzer');
		break;
		case 3:
		    document.querySelectorAll('.reviews__text')[0].classList.add('text__active');
		    document.querySelectorAll('.reviews__about')[0].classList.add('active__about');
		    document.querySelectorAll('.reviews__uzer')[0].classList.add('active__uzer');
		break;
		case 4:
		    document.querySelectorAll('.reviews__text')[4].classList.add('text__active');
		    document.querySelectorAll('.reviews__about')[4].classList.add('active__about');
		    document.querySelectorAll('.reviews__uzer')[4].classList.add('active__uzer');
		break;
		case 5:
		    document.querySelectorAll('.reviews__text')[3].classList.add('text__active');
		    document.querySelectorAll('.reviews__about')[3].classList.add('active__about');
		    document.querySelectorAll('.reviews__uzer')[3].classList.add('active__uzer');
		break;
	}
}
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
function onClick1(h) {
    if (h == "first") {
    	document.querySelector(".burger_menu").style.display = 'none';
    	document.querySelector(".burger_menu__nav").style.display = 'block';
    }else if (h == "second") {
    	if (window.innerWidth > 600) {
    	}else{
    		document.querySelector(".burger_menu").style.display = 'block';
    	}
    	document.querySelector(".burger_menu__nav").style.display = 'none';
    }
}
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
let q = 0
function ourStudio() {
	if (q == 0) {
        q++;
        document.querySelector(".div__studio").style.display = 'block';
        document.querySelectorAll(".footer__title")[0].classList.add('footer__title__active');
	}else if(q == 1){
		q = 0;
		document.querySelector(".div__studio").style.display = 'none';
		document.querySelectorAll(".footer__title")[0].classList.remove('footer__title__active');
	}
}
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
let d = 0;
function stayInTouch() {
	if (d == 0) {
        d++;
        document.querySelector(".div__social_networks").style.display = 'block';
        document.querySelectorAll(".footer__title")[1].classList.add('footer__title__active');
	}else if(d == 1){
		d = 0;
		document.querySelector(".div__social_networks").style.display = 'none';
		document.querySelectorAll(".footer__title")[1].classList.remove('footer__title__active');
	}
}
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
let slider = document.querySelector('.header__slider'),
    sliderList = slider.querySelector('.header__slider-list'),
    sliderTrack = slider.querySelector('.header__slider-track'),
    slides = slider.querySelectorAll('.header__slide'),
    slideWidth,
    slideIndex = 0,
    boolean = true;

setInterval(function() {
	slideWidth = slides[0].offsetWidth;
	document.querySelectorAll('.span__circle').forEach(n => n.classList.remove('active__span'));
    if (boolean === true) {
      slideIndex++;
      sliderTrack.style.transition = 'transform 0.5s';
      if (slideIndex == slides.length - 1) {boolean = false;}
    }else if(boolean === false){
      slideIndex = 0;  //якщо хочеш щоб воно поверталося на початок і йшло тільки в праву сторону
      //slideIndex--;  //якщо хочеш щоб воно йшло спочатку в право а потом в ліво
      sliderTrack.style.transition = 'transform 3s';
      if (slideIndex == 0) {boolean = true;}
    }
    document.querySelectorAll(".span__circle")[slideIndex].classList.add('active__span');
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
}, 15000);
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq