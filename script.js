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
    question: "小勇尚年幼，家人因为新冠肺炎疫情被隔离，谁来照顾他？",
    answers: {
      a: "周春",
      b: "居民委员会",
      c: "孤儿院"
    },
    correctAnswer: "b",
    analysis: "《民法典》第三十四条规定，因发生突发事件等紧急情况，监护人暂时无法履行监护职责，被监护人的生活处于无人照料状态的，被监护人住所地的居民委员会、村民委员会或者民政部门应当为被监护人安排必要的临时生活照料措施。"
  },
  {
    question: "你在京东上买了一本《教材完全解读》，但送来后发现只剩下了半本，卖家说寄出之前书是完整的，那么谁承担书坏的责任？",
    answers: {
      a: "快递公司",
      b: "卖家",
      c: "你"
    },
    correctAnswer: "b",
    analysis: "《民法典》第五百一十二条规定，通过互联网等信息网络订立的电子合同的标的为交付商品并采用快递物流方式交付的，收货人的签收时间为交付时间。第六百零四条规定，标的物毁损、灭失的风险，在标的物交付之前由出卖人承担，交付之后由买受人承担，但是法律另有规定或者当事人另有约定的除外。"
  },
  {
    question: "你租了一间房子，现在即将到期了，有人来看房，如果你们出价相等，那么房子应该租给谁？",
    answers: {
      a: "你",
      b: "新租客",
      c: "这是房东的自由"
    },
    correctAnswer: "a"
    analysis: "《民法典》第七百三十四条规定，租赁期限届满，房屋承租人享有以同等条件优先承租的权利。"
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