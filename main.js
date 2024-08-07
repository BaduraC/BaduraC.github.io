import { generateQuestion, checkAnswer } from './math.js';

function generateMathTask() {
    const question = generateQuestion();
    const taskContainer = document.createElement('div');
    taskContainer.id = 'task-container';
    taskContainer.textContent = question;

    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.id = 'answer';

    const checkButton = document.createElement('button');
    checkButton.textContent = 'Antwort prüfen';
    checkButton.addEventListener('click', checkAnswer);

    const feedback = document.createElement('div');
    feedback.id = 'feedback';

    const container = document.createElement('div');
    container.appendChild(taskContainer);
    container.appendChild(answerInput);
    container.appendChild(checkButton);
    container.appendChild(feedback);

    return container;
}

export { generateMathTask };