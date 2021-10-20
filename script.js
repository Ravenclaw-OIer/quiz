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
    question: "在我国司法结构中，下面哪一个不是司法机关？",
    answers: {
      a: "公安",
      b: "检察院",
      c: "法院",
      d: "稽查局"
    },
    correctAnswer: "d",
    analysis: "公、检、法、司四大机关，共同构成了我国的司法体系。"
  },
  {
    question: "小勇尚年幼，家人因为新冠肺炎疫情被隔离，谁来照顾他？",
    answers: {
      a: "学校",
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
    correctAnswer: "a",
    analysis: "《民法典》第七百三十四条规定，租赁期限届满，房屋承租人享有以同等条件优先承租的权利。"
  },
  {
    question: "小芳12岁时遭到性侵，她后来学了更多法律知识，20岁时想起诉索赔，诉讼时效过了吗？",
    answers: {
      a: "过了",
      b: "没有"
    },
    correctAnswer: "b",
    analysis: "未成年人遭受性侵害的诉讼时效，自受害人满18周岁起算。《民法典》第一百八十八条规定，向人民法院请求保护民事权利的诉讼时效期间为三年。法律另有规定的，依照其规定。《民法典》第一百九十一条规定，未成年人遭受性侵害的损害赔偿请求权的诉讼时效期间，自受害人年满十八周岁之日起计算。"
  },
  {
    question: "以下哪项<strong>不属于</strong>个人信息拥有者的权利？",
    answers: {
      a: "查询权",
      b: "修改权",
      c: "删除权"
    },
    correctAnswer: "b",
    analysis: "应该为更正权而不是修改权。"
  },
  {
    question: "陈少婷在足球场上一个大脚把你送进了医院，但她没有犯规，你可以请求赔偿吗？",
    answers: {
      a: "可以",
      b: "可以，但你需要承担部分责任",
      c: "不可以"
    },
    correctAnswer: "c",
    analysis: "《民法典》第一千一百七十六条规定，自愿参加具有一定风险的文体活动，因其他参加者的行为受到损害的，受害人不得请求其他参加者承担侵权责任；但是，其他参加者对损害的发生有故意或者重大过失的除外。"
  },
  {
    question: "一37岁单身男子有性侵少女的违法犯罪记录，他能收养女儿吗？",
    answers: {
      a: "可以",
      b: "可以，但需要接受监控",
      c: "不可以"
    },
    correctAnswer: "c",
    analysis: "《民法典》在收养人的条件中增加规定 “无不利于被收养人健康成长的违法犯罪记录”，并增加规定民政部门应当依法进行收养评估。"
  },
  {
    question: "一37岁单身男子<strong>无</strong>违法犯罪记录，他能收养女儿吗？",
    answers: {
      a: "可以",
      b: "可以，但需要接受监控",
      c: "不可以"
    },
    correctAnswer: "c",
    analysis: "《民法典》第一千一百零二条规定，无配偶者收养异性子女的，收养人与被收养人的年龄应当相差四十周岁以上。"
  },
  {
    question: "你的女朋友有艾滋病，但向你隐瞒，结婚后你发现了这一点，你可以申请离婚吗？",
    answers: {
      a: "可以",
      b: "不可以"
    },
    correctAnswer: "a",
    analysis: "《民法典》第一千零五十三条规定，一方患有重大疾病的，应当在结婚登记前如实告知另一方；不如实告知的，另一方可以向人民法院请求撤销婚姻。请求撤销婚姻的，应当自知道或者应当知道撤销事由之日起一年内提出。"
  },
  {
    question: "张三和李四结婚，生下的孩子由王五抚养，孩子可以姓王吗？",
    answers: {
      a: "可以",
      b: "不可以"
    },
    correctAnswer: "a",
    analysis: "《民法典》第一千零一十五条规定，自然人应当随父姓或者母姓，但是有下列情形之一的，可以在父姓和母姓之外选取姓氏：（一）选取其他直系长辈血亲的姓氏；（二）因由法定扶养人以外的人扶养而选取扶养人姓氏；（三）有不违背公序良俗的其他正当理由。少数民族自然人的姓氏可以遵从本民族的文化传统和风俗习惯。"
  },
  {
    question: "你的70年住宅建设用地使用权到期后怎么办？",
    answers: {
      a: "你应当等待当地人民政府负责重新分配",
      b: "你应当前往当地人民政府申请延期",
      c: "你应当什么都不用担心并赶快把物理作业写掉"
    },
    correctAnswer: "c",
    analysis: "自动续期。<br/>《民法典》第三百五十九条规定，住宅建设用地使用权期限届满的，自动续期。续期费用的缴纳或者减免，依照法律、行政法规的规定办理。"
  },
  {
    question: "法院判决不准离婚后，一方仍无法挽回对方的感情，双方分居，一方再次起诉离婚，法院会准予吗？",
    answers: {
      a: "无论什么时候，法院必须准予",
      b: "分居一年后，法院必须准予",
      c: "分居三年后，法院必须准予",
      d: "无论多久法院都不必须准予"
    },
    correctAnswer: "b",
    analysis: "双方又分居满一年，法院应当准予离婚。<br/>《民法典》第一千零七十九条规定，夫妻一方要求离婚的，可以由有关组织进行调解或者直接向人民法院提起离婚诉讼。经人民法院判决不准离婚后，双方又分居满一年，一方再次提起离婚诉讼的，应当准予离婚。"
  },
  {
    question: "你得到一个同学的同意，录制了她的声音。接着你将音库制作成虚拟歌姬，你可以任意使用这个声音吗？",
    answers: {
      a: "可以",
      b: "不可以"
    },
    correctAnswer: "b",
    analysis: "声音的保护参照肖像权，而肖像的使用是需要肖像权人的同意的，你获得的仅仅是制作的同意"
  },
  {
    question: "Natsuki 遭父亲虐待，父亲被法院撤销监护权后，有义务继续付抚养费吗？",
    answers: {
      a: "有",
      b: "没有"
    },
    correctAnswer: "a",
    analysis: "《民法典》第三十七条规定，依法负担被监护人抚养费、赡养费、扶养费的父母、子女、配偶等，被人民法院撤销监护人资格后，应当继续履行负担的义务。"
  },
  {
    question: "你在小区中散步时，被一扇窗户砸伤，但这栋楼刚刚建好，并没有人购买、居住，那么谁承担责任？",
    answers: {
      a: "你",
      b: "物业",
      c: "开发商",
      d: "上级管理部门"
    },
    correctAnswer: "b",
    analysis: "准确的说，若物业未采取必要安全保障措施，应承担责任。《民法典》第一千二百五十四条规定，禁止从建筑物中抛掷物品。从建筑物中抛掷物品或者从建筑物上坠落的物品造成他人损害的，由侵权人依法承担侵权责任；经调查难以确定具体侵权人的，除能够证明自己不是侵权人的外，由可能加害的建筑物使用人给予补偿。可能加害的建筑物使用人补偿后，有权向侵权人追偿。物业服务企业等建筑物管理人应当采取必要的安全保障措施防止前款规定情形的发生；未采取必要的安全保障措施的，应当依法承担未履行安全保障义务的侵权责任。发生本条第一款规定的情形的，公安等机关应当依法及时调查，查清责任人。",
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