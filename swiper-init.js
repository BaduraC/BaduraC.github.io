import { generateQuestion } from "./math.js";

let swiper;

document.addEventListener('DOMContentLoaded', function() {
    swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function() {
                generateQuestion();
                addNewSlide(swiper);
            }
        }
    });

    //generate the first question when the side is loading
    generateQuestion();
    addNewSlide(swiper);
});

function addNewSlide(swiper) {
    const newSlide=document.createElement('div');
    newSlide.classList.add('swiper-slide');
    const taskContainer=document.createElement('div');
    taskContainer.id='task-container';
    newSlide.appendChild(taskContainer);
    swiper.appendSlide(newSlide);
}