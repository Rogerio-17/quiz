// DECLARAÇÕES DE VARIAVEIS

const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quiz-container");
const scoreContainer = document.querySelector("#score-container");
const answerTemplate = document.querySelector("#answers-box");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;
let count = 0;

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

    let A = answerTemplate.querySelector("#a");
    let B = answerTemplate.querySelector("#b");
    let C = answerTemplate.querySelector("#c");
    let D = answerTemplate.querySelector("#d");
    function pergunta() {
      let questionArray = arrPerguntas[count];
      let pergunta = questionArray[1];
      let a = questionArray[2];
      let b = questionArray[3];
      let c = questionArray[4];
      let d = questionArray[5];

      // Numero da pergunta e pergunta
      const questionText = quizContainer.querySelector("#question-text");
      const questionNumber = quizContainer.querySelector("#question-number");
      let n = count + 1;

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

      if (count === 0) {
        count++;
      }

      // -------------------------------------------------

      console.log(`Aqui esta correto ${points}`);
    }
    // Contabiliza pontuação
    const buttons = answerTemplate.querySelectorAll("button");
    buttons.forEach(function (button) {
      button.addEventListener("click", () => {
        let questionArray = arrPerguntas[count];
        let correct = questionArray[6];
        const letraSelecionada =
          button.querySelector(".btn-letter").textContent;

        if (correct == letraSelecionada) {
          points++;
        }
      });
    });

    //Execulta as peguntas
    pergunta(count);

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

      setTimeout(() => {
        exe();
        count++;
      }, 2000);
    });

    //Execulta a proxima pergunta
    function exe() {
      pergunta(count);
      console.log(count);

      // controla o numero de perguntas
      if (count === 2) {
        pontuacaoFinal();
      }
    }

    //Mostra tela de pontuação final
    function pontuacaoFinal() {
      scoreContainer.classList.remove("hide");
      quizContainer.classList.add("hide");
      dadosQuiz();
    }

    function dadosQuiz() {
      console.log(scoreContainer);
      let porcentagem = scoreContainer.querySelector("#valorPorcento");
      let questionQtd = scoreContainer.querySelector("#correct-answers");
      let valor = (points / 10) * 100;

      porcentagem.innerHTML = valor;
      questionQtd.innerHTML = points;
    }
  });
