const quizData = {
  geography: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: 0,
    },
    {
      question: "Which continent is Egypt in?",
      options: ["Asia", "Africa", "Europe", "South America"],
      correct: 1,
    },
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      options: [
        "George Washington",
        "Abraham Lincoln",
        "Thomas Jefferson",
        "John Adams",
      ],
      correct: 0,
    },
    {
      question: "In what year did World War II end?",
      options: ["1942", "1945", "1948", "1950"],
      correct: 1,
    },
  ],
  general: [
    {
      question: "Which language is used for web apps?",
      options: ["Python", "JavaScript", "C++", "Java"],
      correct: 1,
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "HyperText Markup Language",
        "HyperText Marketing Language",
        "HyperText Markdown Language",
      ],
      correct: 1,
    },
  ],
};

let currentTopic = "";
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const timerElement = document.getElementById("timer");
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const gradeElement = document.getElementById("grade");

function startQuiz(topic) {
  currentTopic = topic;
  document.getElementById("topic-selection").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizData[currentTopic][currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-button"); // Add a class for styling
    button.addEventListener("click", () => checkAnswer(index));
    optionsElement.appendChild(button);
  });

  resetTimer();
}

function checkAnswer(selected) {
  console.log(`Answer selected: ${selected}`); // Log the selected answer index

  if (selected === quizData[currentTopic][currentQuestionIndex].correct) {
    score++;
  }
  if (currentQuestionIndex < quizData[currentTopic].length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  questionElement.parentElement.style.display = "none";
  resultElement.style.display = "block";

  const percentage = Math.round(
    (score / quizData[currentTopic].length) * 100
  );
  let grade;

  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 50) {
    grade = "D";
  } else {
    grade = "F";
  }

  scoreElement.textContent = `Your Score: ${score} (${percentage}%)`;
  gradeElement.textContent = `Grade: ${grade}`;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timerElement.textContent = `Time Left: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}`;
    if (timeLeft <= 0) {
      checkAnswer(-1); // Auto-submit with no answer
    }
  }, 1000);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.style.display = "none";
  questionElement.parentElement.style.display = "block";
  document.getElementById("topic-selection").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
}

document
  .getElementById("geography-btn")
  .addEventListener("click", function () {
    startQuiz("geography");
  });

document
  .getElementById("history-btn")
  .addEventListener("click", function () {
    startQuiz("history");
  });

document
  .getElementById("general-btn")
  .addEventListener("click", function () {
    startQuiz("general");
  });

document
  .getElementById("restart-btn")
  .addEventListener("click", function () {
    restartQuiz("general");
  });