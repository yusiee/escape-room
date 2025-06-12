
const game = document.getElementById("game");
const timerElement = document.getElementById("timer");
let score = 0;
let timeLeft = 20 * 60;
let currentLevel = 0;

const levels = [
  {
    question: "Level 1: Kies het juiste IP-adres voor het subnet 192.168.1.1",
    type: "choice",
    options: ["192.168.1.100", "10.0.0.5", "172.16.0.1"],
    answer: "192.168.1.100",
    hint: "Een subnet gebruikt meestal IP-adressen die beginnen met hetzelfde blok (192.168.x.x)"
  },
  {
    question: "Level 2: Vind de verborgen tekst via CSS (display:none)",
    type: "text",
    answer: "verstoptehint",
    hint: "Gebruik 'Inspecteer element' in je browser en zoek verborgen tekst"
  },
  {
    question: "Level 3: Welke tool gebruik je op een Windows Server om gebruikersactiviteit te onderzoeken?",
    type: "text",
    answer: "event viewer",
  },
  {
    question: "Level 4: Welke van deze PC-componenten is de RAM?",
    type: "choice",
    options: ["1", "2", "3"],
    answer: "3",
    image: "pcpartpicture2.jpg"  // Zorg ervoor dat je afbeelding bestaat
  },
  {
    question: "Level 5: Wat betekent de binaire code 01100011 01101111 01100100 01100101?",
    type: "text",
    answer: "code",
    hint: "Gebruik een binaire converter of ASCII-tabel"
  },
  {
    question: "Level 6: Wat is de juiste waarde van x? (x * 2 == 10 and x + 3 == 8)",
    type: "text",
    answer: "5",
    hint: "Los de vergelijking op met pen en papier"
  },
  {
    // Level 7: Link naar Tinkercad en invoerveld voor "opdracht af"
    question: "Level 7: Maak de Arduino-opdracht af in Tinkercad en deel het met de docent",
    type: "text",  // Dit is nu een tekstinvoer
    answer: "opdracht af",  // Antwoord dat de gebruiker moet invoeren
    hint: "Klik op de link om de Arduino-opdracht uit te voeren in Tinkercad. Zorg ervoor dat je de LED correct laat knipperen! Als je klaar bent, typ dan 'opdracht af' om verder te gaan.",
    showFinishButton: true, // We tonen de knop voor het eindscherm als de gebruiker het juiste antwoord invoert
    link: "https://www.tinkercad.com/joinclass/CTSZCPQX5",  // Jouw Tinkercad Classroom link
  }
];

function startLevel() {
  if (currentLevel >= levels.length) {
    game.innerHTML = `<h2>✅ SERVER GERED!</h2>
    <p>[✔] Verbinding hersteld...</p>
    <p>[✔] Schoolnetwerk veiliggesteld</p>
    <p>[✔] Teamstatus: EPIC</p>`;
    return;
  }

  const level = levels[currentLevel];
  let html = `<h2>${level.question}</h2>`;

  if (level.type === "choice") {
    level.options.forEach(opt => {
      html += `<button onclick="checkAnswer('${opt}')">${opt}</button><br/>`;
    });
  } else if (level.type === "text") {
    html += `<input type="text" id="answerInput" placeholder="Typ je antwoord..."><br/>
             <button onclick="checkAnswer()">Verzend</button>`;
  } else if (level.type === "link") {
    html += `<p><a href="${level.link}" target="_blank">Klik hier om de Arduino-opdracht uit te voeren in Tinkercad</a></p>`;
    html += `<br/><input type="text" id="answerInput" placeholder="Typ 'opdracht af' als je klaar bent"><br/>
             <button onclick="checkAnswer()">Verzend</button>`;
  } else if (level.type === "button") {
    html += `<button onclick="completeArduinoTask()">${level.buttonText}</button><br/>`;
    html += `<div id="nextLevelMessage" style="display:none;">${level.nextLevelText}</div>`;
    if (level.showFinishButton) {
      html += `<button id="finishButton" onclick="finishEscapeRoom()">Klaar! Ga naar het eindscherm</button>`;
    }
  }

  // Voeg de afbeelding toe als er een afbeelding is
  if (level.image) {
    html += `<img id="componentImage" src="${level.image}" alt="PC Component" style="max-width: 100%; height: auto; margin-top: 20px; border-radius: 10px;">`; 
  }

  // Voeg de Tinkercad link alleen toe voor Level 7
  if (currentLevel === 6) {  // Level 7 is de zevende in de lijst, dus de index is 6
    html += `<p><a href="${level.link}" target="_blank">Klik hier om de Arduino-opdracht uit te voeren in Tinkercad</a></p>`;
  }

  // Hint-knop alleen voor levels die een hint hebben
  if (level.hint) {
    html += `<button onclick="toggleHint()">💡 Tip?</button>
             <div id="hint" class="hint">${level.hint}</div>`;
  }

  game.innerHTML = html;
}

function completeArduinoTask() {
  const nextLevelMessage = document.getElementById("nextLevelMessage");
  const finishButton = document.getElementById("finishButton");

  nextLevelMessage.style.display = "block"; // Show next level message when they click the button
  finishButton.style.display = "block";  // Show finish button after completion
  currentLevel++;
}

function finishEscapeRoom() {
  game.innerHTML = "<h2>✅ Je hebt de Escape Room voltooid!</h2><p>Gefeliciteerd, je hebt alle opdrachten succesvol voltooid.</p>";
}

function checkAnswer(input = null) {
  const level = levels[currentLevel];
  let userAnswer = input || document.getElementById("answerInput").value.trim();

  // Verwijder onbedoelde spaties en maak de invoer hoofdletterongevoelig
  if (userAnswer.toLowerCase() === level.answer.toLowerCase().trim()) {
    if (currentLevel === 6) {  // Level 7 is de zevende, index 6
      finishEscapeRoom();  // Direct naar het eindscherm zonder verder te gaan naar Level 8
    } else {
      currentLevel++;
      startLevel();
    }
  } else {
    alert("❌ Fout antwoord! Probeer opnieuw.");
  }
}

function toggleHint() {
  const hint = document.getElementById("hint");
  hint.style.display = hint.style.display === "none" ? "block" : "none";
}

startLevel();

setInterval(() => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  if (timeLeft > 0) timeLeft--;
  else game.innerHTML = "<h2>⏰ Tijd is om! De server is verloren...</h2>";
}, 1000);


