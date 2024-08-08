let currentQuestion;
let currentAnswer;

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    switch (operator) {
        case '+':
            currentAnswer = num1 + num2;
            break;
        case '-':
            currentAnswer = num1 - num2;
            break;
        case '*':
            currentAnswer = num1 * num2;
            break;
        case '/':
            currentAnswer = (num1 / num2).toFixed(2); // Zwei Dezimalstellen für Division
            break;
    }

    currentQuestion = `${num1} ${operator} ${num2}`;
    document.getElementById('question').innerText = currentQuestion;
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const feedback = document.getElementById('feedback');

    if (parseFloat(userAnswer) === parseFloat(currentAnswer)) {
        feedback.innerText = 'Richtig!';
        feedback.style.color = 'green';
    } else {
        feedback.innerText = `Falsch! Die richtige Antwort ist ${currentAnswer}`;
        feedback.style.color = 'red';
    }

    // Neue Frage generieren
    generateQuestion();
    document.getElementById('answer').value = '';
}

// Initiale Frage generieren
generateQuestion();