function enviaPergunta(url, body) {
  let request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("content-type", "application/json");
  request.send(JSON.stringify(body));

  request.onload = function () {
    event.preventDefault();
    if (this.responseText != "") {
      alert("Os dados foram salvos com sucesso!");
      limpaCampos();
    }
  };

  return request.responseText;
}

function limpaCampos() {
  document.querySelector("#questao").value = "";
  document.querySelector("#opcaoA").value = "";
  document.querySelector("#opcaoB").value = "";
  document.querySelector("#opcaoC").value = "";
  document.querySelector("#opcaoD").value = "";
}

function cadastrarPergunta() {
  event.preventDefault();
  let url = "http://localhost:3000/add/perguntas";

  let question = document.querySelector("#questao").value;

  let a = document.querySelector("#opcaoA").value;
  let b = document.querySelector("#opcaoB").value;
  let c = document.querySelector("#opcaoC").value;
  let d = document.querySelector("#opcaoD").value;

  let correctAnswer = document.querySelector("#opcaoCorreta").value;

  // Verifica se todos os campos foram preenchidos
  if (
    question == "" ||
    a == "" ||
    b == "" ||
    c == "" ||
    d == "" ||
    correctAnswer == ""
  ) {
    alert("Por favor preencha todos os campos");
  } else {
    let body = {
      question: question,
      answersA: a,
      answersB: b,
      answersC: c,
      answersD: d,
      correct: correctAnswer,
    };

    enviaPergunta(url, body);
  }
}
