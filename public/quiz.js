const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const backButton = document.getElementById("previous");
const nextButton = document.getElementById("next");



// Parse the JSON string to get the quizData object
// var quizData = JSON.parse(quizDataString);


let currentQuestion = 0;
let score = 0;

function sendResultsToBackend() {
    // Make a POST request to the backend with the result array
    fetch('http://localhost:5000/submit-answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({selectedAnswers,score}),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle response from backend if needed
        window.location.href ='http://localhost:5000/feedback';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;
  
    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}
let selectedAnswers = [];

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
    const allButtons = document.querySelectorAll('#options button');
    allButtons.forEach(button => button.classList.remove('selected'));
    selectedAnswers[currentQuestion] = selectedButton.innerText;
    selectedButton.classList.add('selected');
    if (selectedButton.innerText === answer) {
        score++;
    }

}

function showResult() {
    quiz.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: ${score}/${quizData.length}</p>
    `;
}

function goToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        sendResultsToBackend();
        window.location.href ='http://localhost:5000/feedback';
    }
}

function goToPreviousQuestion() {
    currentQuestion--;
    if (currentQuestion >= 0) {
        showQuestion();
    }
}

// submitButton.addEventListener("click", goToNextQuestion);
backButton.addEventListener("click", goToPreviousQuestion);
nextButton.addEventListener("click", goToNextQuestion);

showQuestion();
