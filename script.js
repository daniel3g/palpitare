document.addEventListener("DOMContentLoaded", function () {
  function getRandomInt(min, max) {
    min = Math.ceil(1000);
    max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min);
  }

  var randomNumber = localStorage.getItem("randomNumber");
  if (!randomNumber) {
    randomNumber = getRandomInt();
    localStorage.setItem("randomNumber", randomNumber);
  } else {
    randomNumber = parseInt(randomNumber);
  }

  var xp = localStorage.getItem("xp");  
    if(!xp){
      xp = 0;
    }else{
      xp = parseInt(xp);
    }

  var level = localStorage.getItem("level");
    if(!level){
      level = 1;
    }else{
      level = parseInt(level);
    }

    var nextLevel = Math.trunc(50/3*(Math.pow((level + 1), 3)-6*Math.pow((level + 1), 2)+17*(level + 1)-12));
    localStorage.setItem("nextLevel", nextLevel);
    console.log(nextLevel);

    if(xp >= nextLevel){
      level += 1;
      console.log(level);
    }

    localStorage.setItem("level", level);

    nextLevel = Math.trunc(50/3*(Math.pow((level + 1), 3)-6*Math.pow((level + 1), 2)+17*(level + 1)-12));
    localStorage.setItem("nextLevel", nextLevel);

    document.getElementById("xp").innerHTML = `${xp}/${nextLevel}`;
    document.getElementById("level").innerHTML = level;

  var score = localStorage.getItem("score");
  if(!score){
    score = 100;
  }else{
    score = parseInt(score);
  }

  var acertos = [];

  var number = String(randomNumber).split("").map(function (randomNumber) {
    return Number(randomNumber);
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

      var comparar = [...number];

      var input = document.querySelector("#input-palpite");
      var palpiteInput = input.value;
      document.getElementById("input-palpite").value = "";

      var palpite = String(palpiteInput).split("").map(function (palpiteInput) {
        return Number(palpiteInput);
      });

      var palpiteExibir = [palpite[0], palpite[1], palpite[2], palpite[3]];

      console.log(palpite);
      console.log(number);
      console.log(comparar);

      for (var i = 0; i < number.length; i++) {
        if (palpite[i] === comparar[i]) {
          acertos.push("😀");
          comparar[i] = -3;
          palpite[i] = -4;
        }
      }

      for (var i = 0; i < number.length; i++) {
        for (var j = 0; j < number.length; j++) {
          if (palpite[i] === comparar[j]) {
            acertos.push("😏");
            comparar[j] = -2;
            palpite[i] = -1;
          }
        }
      }

      if (acertos.length === 0) {
        score -= 10;
        localStorage.setItem("score", score);
      } else if (acertos[0] === "😀" && acertos[1] === "😀" && acertos[2] === "😀" && acertos[3] === "😀") {
        score += Math.trunc((Math.pow(level, 2)*5)/2);

        localStorage.setItem("score", score);
      }

      score -= 5;
      localStorage.setItem("score", score);

      comparar = [...number];

      if (acertos.length === 0) {
        acertos = "🚫";
      }

      console.log("Score: " + score);

      let list = document.getElementById("palpite").innerHTML;
      let list2 = document.getElementById("dica").innerHTML;

      if (acertos[0] === "😀" && acertos[1] === "😀" && acertos[2] === "😀" && acertos[3] === "😀") {
        xp += score;
        localStorage.setItem("xp", xp);
        list += "<li>" + "Parabéns! Você acertou o número era: " + randomNumber + "Você marcou " + score + "pontos" + "</li>";
        list += "<button id='button-next'>" + "próxima" + "</button>";
        document.getElementById("palpite").innerHTML = list;

        localStorage.removeItem("randomNumber");
        localStorage.removeItem("score"); 
        localStorage.removeItem("resetGame"); 

        var nextButton = document.querySelector("#button-next");
        nextButton.addEventListener("click", function () {
          document.getElementById("button-next").style.display = "none"; 
          location.reload(); 
        });
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
