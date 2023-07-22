"use strict";
window.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".form__input, .form__textarea")
    
    items.forEach(element => {
        element.addEventListener("input", e => {
            const item = e.target;

            if(item.value){
                item.classList.remove('empty')
            }else{
                item.classList.add('empty')
            }
        });
    });
});