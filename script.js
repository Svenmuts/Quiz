const questions = [
    {
        question: "Wat is een closure in JavaScript?",
        answers: [
            { text: "Een object dat een functie is", correct: false },
            { text: "Een lus die wordt gebruikt om een taak te herhalen totdat aan een bepaalde voorwaarde is voldaan.", correct: false },
            { text: "Een JavaScript-functie die een andere functie aanroept.", correct: false },
            { text: "Een combinatie van een functie en de omvang waarin deze is gedefinieerd, waardoor de functie toegang heeft tot variabelen in die omvang, zelfs nadat de omvang is gesloten.", correct: true }
        ]
    },
    {
        question: "Wat is het verschil tussen '==' en '===' in JavaScript?",
        answers: [
            { text: "'==' controleert alleen op gelijke waarde.", correct: false },
            { text: "'==' controleert op gelijke waarde, terwijl '===' controleert op gelijke waarde en gelijk type.", correct: true },
            { text: "'===' controleert alleen op gelijk type.", correct: false },
            { text: "Er is geen verschil, ze kunnen door elkaar worden gebruikt.", correct: false }
        ]
    },
    {
        question: "Wat doet de 'typeof' operator in JavaScript?",
        answers: [
            { text: "Geeft het type van een variabele of expressie terug als een string.", correct: true },
            { text: "Controleert of een variabele gedefinieerd is.", correct: false },
            { text: "Voert een typovergelijking uit tussen twee variabelen.", correct: false },
            { text: "Controleert of een variabele null of undefined is.", correct: false }
        ]
    },
    {
        question: "Wat betekent 'DRY' in softwareontwikkeling?",
        answers: [
            { text: "'DRY' staat voor 'Don't Repeat Yourself', wat betekent dat code niet moet worden herhaald maar moet worden geabstraheerd in herbruikbare componenten.", correct: true },
            { text: "'DRY' staat voor 'Do Refactor Yourself', wat betekent dat ontwikkelaars regelmatig code moeten herschrijven.", correct: false },
            { text: "'DRY' staat voor 'Do Run Yourself', wat betekent dat code automatisch moet worden uitgevoerd zonder handmatige tussenkomst.", correct: false },
            { text: "'DRY' staat voor 'Don't Run Yourself', wat betekent dat ontwikkelaars geen zware processen handmatig moeten uitvoeren.", correct: false }
        ]
    },
    {
        question: "Wat is het verschil tussen 'let', 'const', en 'var' in JavaScript?",
        answers: [
            { text: "'const' kan niet opnieuw worden toegewezen, terwijl 'let' en 'var' dat wel kunnen.", correct: false },
            { text: "'let' is alleen-lezen, terwijl 'const' toewijzing vereist.", correct: false },
            { text: "'let' en 'const' hebben block scope, terwijl 'var' function scope heeft.", correct: true },
            { text: "'var' is alleen bedoeld voor globale variabelen, terwijl 'let' en 'const' voor lokale variabelen zijn.", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score: ${score} / ${questions.length}`;
    nextButton.innerHTML = "Start opnieuw";
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

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}