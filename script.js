const GROQ_API_KEY = "";

let popularity = 50;

const scenarios = [
  "The economy is crashing and inflation is rising.",
  "Your opponent accuses you of being weak on national defense.",
  "Healthcare costs are skyrocketing nationwide.",
  "Unemployment is rising in key swing states.",
  "A major international crisis has just begun."
];

let current = 0;

// Load first scenario
function loadScenario() {
  document.getElementById("scenario").innerText = scenarios[current];
  document.getElementById("result").innerText = "";
}

// Call Groq AI
async function callAI(playerInput, scenario) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are a political simulation engine. Evaluate the player's response to a campaign scenario. Respond in this format:\n\n1. Short reaction (1-2 sentences)\n2. Popularity change as a number between -10 and +10\n3. Brief explanation"
        },
        {
          role: "user",
          content:
            `Scenario: ${scenario}\n\nPlayer response: ${playerInput}`
        }
      ],
      temperature: 0.8
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Handle submit
async function submitAnswer() {
  const input = document.getElementById("playerInput").value;

  if (!input) return;

  document.getElementById("result").innerText = "Processing...";

  const scenario = scenarios[current];

  const aiResponse = await callAI(input, scenario);

  // Try to extract popularity change from AI output
  let match = aiResponse.match(/-?\d+/g);
  let change = 0;

  if (match && match.length > 0) {
    change = parseInt(match[1] || match[0]);
  }

  popularity += change;

  document.getElementById("result").innerText =
    aiResponse + "\n\nPopularity: " + popularity;

  document.getElementById("playerInput").value = "";

  current++;

  if (current < scenarios.length) {
    setTimeout(loadScenario, 1500);
  } else {
    setTimeout(endGame, 1500);
  }
}

function endGame() {
  let result =
    popularity >= 55
      ? "YOU WIN THE ELECTION 🟢"
      : "YOU LOSE THE ELECTION 🔴";

  document.getElementById("scenario").innerText = result;
  document.getElementById("result").innerText =
    "Final popularity: " + popularity;
}

// start game
loadScenario();
