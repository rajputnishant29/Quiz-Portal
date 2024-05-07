const questions = [
    {
        question: "naam btayiye",
        answers: [
            {text: "binod", correct: false},
            {text: "baldev", correct: false},
            {text: "bhupendra jogi", correct: true},
            {text: "mai nhi btaungaga", correct: false}
        ]
    },
    {
        question: "naam btayiye",
        answers: [
            {text: "binod", correct: false},
            {text: "baldev", correct: false},
            {text: "bhupendra jogi", correct: true},
            {text: "mai nhi btaungaga", correct: false}
        ]
    },
    {
        question: "naam btayiye",
        answers: [
            {text: "binod", correct: false},
            {text: "baldev", correct: false},
            {text: "bhupendra jogi", correct: true},
            {text: "mai nhi btaungaga", correct: false}
        ]
    },
    {
        question: "naam btayiye",
        answers: [
            {text: "binod", correct: false},
            {text: "baldev", correct: false},
            {text: "bhupendra jogi", correct: true},
            {text: "mai nhi btaungaga", correct: false}
        ]
    },
    // Add more questions here...
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    prevButton.innerHTML = "Previous";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    prevButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function handlePrevButton() {
    currentQuestionIndex--;
    showQuestion();
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        handlePrevButton();
    } else {
        prevButton.style.display = "none";
    }
});

startQuiz();
