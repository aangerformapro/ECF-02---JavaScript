var inputs = document.querySelectorAll("input");

function calculateIMC() {
  var weight = inputs[0].value;
  var height = inputs[1].value;

  if (!height || !weight || height <= 0 || weight <= 0) {
    errorMessage();
    return;
  }
  
  var IMC = (weight / Math.pow(height / 100, 2)).toFixed(1);
  document.querySelector(".resultsScore").innerHTML = IMC;

  if (IMC <= 18.5) {
    document.querySelector(".resultsInformations").innerHTML =
      "Poids insuffisant et pouvant occasionner certains risques pour la santé.";
  }
  else if (IMC <= 24.9) {
    document.querySelector(".resultsInformations").innerHTML =
      "Poids santé qui n'augmente pas les risques pour la santé.";
  }
  else if (IMC <= 29.9) {
    document.querySelector(".resultsInformations").innerHTML =
      "Excès de poids pouvant occasionner certains risques pour la santé.";
  }
  else if (IMC >= 30) {
    document.querySelector(".resultsInformations").innerHTML =
      "Obésité, risque accru de développer certaines maladies.";
  }
}

function errorMessage() {
  document.querySelector(".resultsScore").innerHTML = "OOPS";
  document.querySelector(".resultsInformations").innerHTML =
    "Merci de remplir tous les champs";
}

document.querySelector("#calculateIMC").addEventListener("click", calculateIMC);
