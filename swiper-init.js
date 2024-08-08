import Swiper from 'https://unpkg.com/swiper@9.1.0/swiper-bundle.esm.browser.min.js';
import { generateQuestion } from "./math.js";
import { generateMathTask } from './math.js';

let swiper;

document.addEventListener('DOMContentLoaded', function() {
    swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        touchEventsTarget: 'container',
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
    taskContainer.appendChild(generateMathTask());
    newSlide.appendChild(taskContainer);
    swiper.appendSlide(newSlide);
    swiper.update();
}

export { addNewSlide };