// DECLARAÇÕES DE VARIAVEIS

const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;
let count = 0;

const answerTemplate = document.querySelector("#answers-box");

let A = answerTemplate.querySelector("#a");
let B = answerTemplate.querySelector("#b");
let C = answerTemplate.querySelector("#c");
let D = answerTemplate.querySelector("#d");

fetch("http://localhost:3000/perguntas")
  .then((respostap) => {
    return respostap.json();
  })
  .then((dados) => {
    let dado = dados;

    var questions = dado.map((item) => {
      return Object.keys(item).map(function (key) {
        return item[key];
      });
    });

    function pergunta() {
      let questionArray = questions[count];
      let pergunta = questionArray[1];
      let a = questionArray[2];
      let b = questionArray[3];
      let c = questionArray[4];
      let d = questionArray[5];
      let correct = questionArray[6];

      // Numero da pergunta e pergunta
      const questionText = quizContainer.querySelector("#question-text");
      const questionNumber = quizContainer.querySelector("#question-number");
      questionText.innerHTML = pergunta;
      questionNumber.innerHTML = 1;

      //seleciona alternativa

      //Verifica qual alternativa esta correta
      answerTemplate.addEventListener("click", function () {
        if (correct == "a") {
          A.classList.add("correct-answer");
          A.classList.remove("wrong-answer");
        } else {
          A.classList.add("wrong-answer");
          A.classList.remove("correct-answer");
        }

        if (correct == "b") {
          B.classList.add("correct-answer");
          B.classList.remove("wrong-answer");
        } else {
          B.classList.add("wrong-answer");
          B.classList.remove("correct-answer");
        }

        if (correct == "c") {
          C.classList.add("correct-answer");
          C.classList.remove("wrong-answer");
        } else {
          C.classList.add("wrong-answer");
          C.classList.remove("correct-answer");
        }

        if (correct == "d") {
          D.classList.add("correct-answer");
          D.classList.remove("wrong-answer");
        } else {
          D.classList.add("wrong-answer");
          D.classList.remove("correct-answer");
        }

        nextQuestion();
      });

      //Alt A
      let letterBtnA = A.querySelector(".btn-letter");
      let answerTextA = A.querySelector(".question-answer");
      //Alt B
      let letterBtnB = B.querySelector(".btn-letter");
      let answerTextB = B.querySelector(".question-answer");
      //Alt C
      let letterBtnC = C.querySelector(".btn-letter");
      let answerTextC = C.querySelector(".question-answer");
      //Alt D
      let letterBtnD = D.querySelector(".btn-letter");
      let answerTextD = D.querySelector(".question-answer");

      // A
      letterBtnA.innerHTML = letters[0];
      answerTextA.innerHTML = a;

      // B
      letterBtnB.innerHTML = letters[1];
      answerTextB.innerHTML = b;

      //C
      letterBtnC.innerHTML = letters[2];
      answerTextC.innerHTML = c;

      //D
      letterBtnD.innerHTML = letters[3];
      answerTextD.innerHTML = d;

      console.log(count);
    }

    function nextQuestion() {
      if (count === 0) {
        pergunta();
        console.log("passou aqui");
      } else {
        pergunta();
        console.log("aqui");
      }
    }

    nextQuestion();
  });

// Exibe a tela final
function showSucccessMessage() {
  hideOrShowQuizz();

  // trocar dados da tela de sucesso

  // calcular o score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");

  displayScore.textContent = score.toString();

  // alterar o número de perguntas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// Mostra ou esconde o score
function hideOrShowQuizz() {
  quizContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {
  // zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});
