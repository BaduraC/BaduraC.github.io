document.addEventListener('DOMContentLoaded', function () {
    const swiperWrapper = document.getElementById('swiperWrapper');

    let slideIndex = 1;

    function addSlide() {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';

        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.textContent = `Aufgabe ${slideIndex}:`;

        const answerField = document.createElement('input');
        answerField.type = 'text';
        answerField.className = 'answer-field';
        answerField.placeholder = 'Antwort eingeben';

        taskContainer.appendChild(taskElement);
        taskContainer.appendChild(answerField);
        slide.appendChild(taskContainer);
        swiperWrapper.appendChild(slide);

        slideIndex++;
    }

    // Initial slides
    for (let i = 0; i < 5; i++) {
        addSlide();
    }

    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                if (swiper.isEnd) {
                    addSlide();
                }
            },
        },
    });
});