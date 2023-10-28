document.addEventListener("DOMContentLoaded", function () {
  // Função que gera número aleatório de 1000 a 9999
  function getRandomInt(min, max) {
    min = Math.ceil(1000);
    max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Verifica se há um número aleatório no localStorage, caso contrário, gera um novo
  var randomNumber = localStorage.getItem("randomNumber");
  if (!randomNumber) {
    randomNumber = getRandomInt();
    localStorage.setItem("randomNumber", randomNumber);
  } else {
    randomNumber = parseInt(randomNumber);
  }

  // Cria um array para armazenar os acertos
  var acertos = [];

  // Cria um array que recebe o número aleatório dividido em uma lista ordenada
  var number = String(randomNumber).split("").map(function (randomNumber) {
    return Number(randomNumber);
  });

  // Event listener para o botão "Próxima Jogada"
  var nextButton = document.querySelector("#button-next");
  nextButton.addEventListener("click", function () {
    localStorage.removeItem("randomNumber"); // Limpa o número aleatório
    localStorage.removeItem("resetGame"); // Limpa a flag de reinício do jogo
    document.getElementById("button-next").style.display = "none"; // Oculta o botão "Próxima Jogada"
    location.reload(); // Recarrega a página para gerar um novo número aleatório
  });

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var btn = document.querySelector("#button-send");
      btn.click();
      e.preventDefault();

      if (localStorage.getItem("resetGame") === "true") {
        localStorage.removeItem("randomNumber");
        localStorage.removeItem("resetGame");
        document.getElementById("palpite").innerHTML = "";
        document.getElementById("dica").innerHTML = "";
      }

      // A variável comparar recebe todos os valores do array number de forma que o array number permanece com os mesmos valores
      var comparar = [...number];

      var input = document.querySelector("#input-palpite");
      var palpiteInput = input.value;
      document.getElementById("input-palpite").value = "";

      // Coleta o palpite via formulário e transforma a string recebida em array guardando na variável palpite
      var palpite = String(palpiteInput).split("").map(function (palpiteInput) {
        return Number(palpiteInput);
      });

      // Exibe o palpite coletado no formulário
      var palpiteExibir = [palpite[0], palpite[1], palpite[2], palpite[3]];

      // Consoles para teste
      console.log(palpite);
      console.log(number);
      console.log(comparar);

      // Verifica se cada posição do array palpite corresponde à mesma posição do array comparar; cada valor correspondente guarda um valor no array acertos
      for (var i = 0; i < number.length; i++) {
        if (palpite[i] === comparar[i]) {
          acertos.push("😀");
          comparar[i] = -3;
          palpite[i] = -4;
        }
      }

      // Verifica se uma posição do array palpite corresponde a uma posição do array comparar, excluindo o caso em que a posição seja a mesma; cada valor correspondente guarda um valor no array acertos
      for (var i = 0; i < number.length; i++) {
        for (var j = 0; j < number.length; j++) {
          if (palpite[i] === comparar[j]) {
            acertos.push("😏");
            comparar[j] = -2;
            palpite[i] = -1;
          }
        }
      }

      comparar = [...number];

      // Caso o array acertos esteja vazio, exibe um emoji
      if (acertos.length === 0) {
        acertos = "🚫";
        localStorage.setItem("resetGame", "true"); // Define a flag para reiniciar o jogo
        document.getElementById("button-next").style.display = "block"; // Exibe o botão "Próxima Jogada"
      }

      let list = document.getElementById("palpite").innerHTML;
      let list2 = document.getElementById("dica").innerHTML;

      // Verifica se todas as posições do array acertos têm o valor correspondente "😀"; caso verdadeiro, exibe a mensagem de acerto
      if (acertos[0] === "😀" && acertos[1] === "😀" && acertos[2] === "😀" && acertos[3] === "😀") {
        list += "<li>" + "Parabéns! Você acertou o número era: " + randomNumber + "</li>";
        document.getElementById("palpite").innerHTML = list;
      } else {
        if (acertos != "🚫") {
          acertos.sort(function (a, b) {
            return b - a;
          });
        }

        list += "<li>" + palpiteExibir + "</li>";
        list2 += "<li><span>" + acertos + "</span></li>";
        document.getElementById("palpite").innerHTML = list;
        document.getElementById("dica").innerHTML = list2;
        console.log(acertos);
        acertos = [];

        var objDiv = document.getElementById("div_chat");
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }
  });
});
