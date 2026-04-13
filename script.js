let popularity = 50;

const scenarios = [
  "The economy is crashing. What do you say?",
  "Your opponent calls you weak on defense. Respond.",
  "Healthcare costs are rising. What's your plan?"
];

let current = 0;

function loadScenario() {
  document.getElementById("scenario").innerText = scenarios[current];
}

function submitAnswer() {
  let input = document.getElementById("playerInput").value;

  // VERY simple logic for now
  if (input.toLowerCase().includes("economy")) {
    popularity += 5;
  } else {
    popularity -= 3;
  }

  document.getElementById("result").innerText =
    "Popularity: " + popularity;

  current++;

  if (current < scenarios.length) {
    loadScenario();
  } else {
    endGame();
  }
}

function endGame() {
  let result = popularity > 50 ? "You win!" : "You lose!";
  document.getElementById("scenario").innerText = result;
}

loadScenario();
