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

    let dadosPergunta = dado.map((item) => {
      return item;
    });

    let arrPerguntas = dadosPergunta.map(function (i) {
      return Object.keys(i).map(function (key) {
        return i[key];
      });
    });

    function pergunta(i) {
      let questionArray = arrPerguntas[i];
      let pergunta = questionArray[1];
      let a = questionArray[2];
      let b = questionArray[3];
      let c = questionArray[4];
      let d = questionArray[5];

      // Numero da pergunta e pergunta
      const questionText = quizContainer.querySelector("#question-text");
      const questionNumber = quizContainer.querySelector("#question-number");
      let n = i + 1;

      questionText.innerHTML = pergunta;
      questionNumber.innerHTML = n;

      //seleciona alternativa
      function clearClass() {
        A.classList.remove("correct-answer");
        A.classList.remove("wrong-answer");

        B.classList.remove("correct-answer");
        B.classList.remove("wrong-answer");

        C.classList.remove("correct-answer");
        C.classList.remove("wrong-answer");

        D.classList.remove("correct-answer");
        D.classList.remove("wrong-answer");
      }

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

      clearClass();
    }
    //Verifica qual alternativa esta correta e passa para proxima pergunta
    answerTemplate.addEventListener("click", function checkPer() {
      let questionArray = arrPerguntas[count];
      let correct = questionArray[6];
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
      return setTimeout(() => {
        console.log("t");
        exe();
        count++;
      }, 2000);
    });

    function exe() {
      pergunta(count);
    }
    pergunta(0);
  });
