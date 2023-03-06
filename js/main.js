// DECLARAÇÕES DE VARIAVEIS

const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    question: "PHP foi desenvolvido para qual fim?",
    answers: [
      {
        answer: "back-end",
        correct: true,
      },
      {
        answer: "front-end",
        correct: false,
      },
      {
        answer: "Sistema operacional",
        correct: false,
      },
      {
        answer: "Banco de dados",
        correct: false,
      },
    ],
  },
  {
    question: "Uma forma de declarar variável em JavaScript:",
    answers: [
      {
        answer: "$var",
        correct: false,
      },
      {
        answer: "var",
        correct: true,
      },
      {
        answer: "@var",
        correct: false,
      },
      {
        answer: "#let",
        correct: false,
      },
    ],
  },
  {
    question: "Qual o seletor de id no CSS?",
    answers: [
      {
        answer: "#",
        correct: true,
      },
      {
        answer: ".",
        correct: false,
      },
      {
        answer: "@",
        correct: false,
      },
      {
        answer: "/",
        correct: false,
      },
    ],
  },
];

//SUBSTITUIÇÃO DO QUIZ PARA A PRIMEIRA PERGUNTA
function init() {
  creatQuestion(0);
}

//Cria uma pergunta
function creatQuestion(i) {
  //limpar questão anterior
  const oldButtons = answersBox.querySelectorAll("button");
  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  //alterar o texto da pegunta
  const questionText = quizContainer.querySelector("#question-text");
  const questionNumber = quizContainer.querySelector("#question-number");

  questionText.innerHTML = questions[i].question;
  questionNumber.innerHTML = i + 1;

  //insere as alternativas
  questions[i].answers.forEach(function (answer, i) {
    //Cria tempalte do botão do quiz
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.innerHTML = letters[i];
    answerText.innerHTML = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);

    //remover hide e template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);
  });
}

// inicia quiz
init();
