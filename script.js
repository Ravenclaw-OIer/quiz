let numCorrect = 0;
function initQuiz() {
  const output = [];
  questions.forEach(
    (currentQuestion, questionNumber) => {
      const answers = [];
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label class="mdui-radio">
            <input type="radio" name="question${questionNumber}" value="${letter}">
            <i class="mdui-radio-icon"></i>
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label><br/>`
        );
      }
      output.push(
        `<div class="slide">
          <div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>
        </div>`
      );
    }
  );
  quizContainer.innerHTML = output.join('');
}

function showResults(questionNumber) {
  const answerContainers = quizContainer.querySelectorAll('.answers');

//  questions.forEach(
 //   (currentQuestion, questionNumber) => {
  let currentQuestion = questions[questionNumber];
      const answerContainer = answerContainers[questionNumber];
      const selected = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selected) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      } else {
        answerContainers[questionNumber].style.color = 'red';
      }
//    }
//  );
  resultsContainer.innerHTML = `<p style="font-size:20px">正确答案：${currentQuestion.correctAnswer} <br/> 
  解析：${currentQuestion.analysis}
  </p>`;
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0) { // first slide
    previousButton.style.display = 'none';  // no next slide available, hide it
  }
  else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) { // last slide
    nextButton.style.display = 'none';  // no next slide available, hide it
    submitButton.style.display = 'inline-block';
  }
  else {
    nextButton.style.display = 'inline-block';
  }
  resultsContainer.innerHTML = '';
}
function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}


const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
let currentSlide = 0;

const questions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c",
    analysis: "B. Eich 发明了 JavaScript"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];


initQuiz();
const submitButton = document.getElementById('submit');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');

showSlide(currentSlide);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButton.addEventListener('click', function () { showResults(currentSlide);});