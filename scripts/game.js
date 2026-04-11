import { savePlayerData, getPlayerData } from './storage.js'; 

const horrorQuestions = [
    { q: "Who is the killer in 'Halloween'?", a: "Michael Myers", options: ["Michael Myers", "Jason Voorhees", "Freddy Krueger"] },
    { q: "Which movie features Chucky?", a: "Child's Play", options: ["Annabelle", "Child's Play", "IT"] },
    { q: "What is the hotel in 'The Shining'?", a: "Overlook", options: ["Overlook", "Bates", "Hill House"] },
    { q: "What is the killer's name in 'Scream'?", a: "Ghostface", options: ["Ghostface", "Pinhead", "Leatherface"] },
    { q: "Which film features the line 'They're coming to get you, Barbara'?", a: "Night of the Living Dead", options: ["Night of the Living Dead", "Evil Dead", "The Fog"] }
];

let currentScore = 0;
let slasherDistance = 0;
let currentQuestionIndex = 0;

const settingsForm = document.getElementById('settingsForm');

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!settingsForm.checkValidity()) {
        settingsForm.classList.add('was-validated');
        return;
    }
    const name = document.getElementById('playerName').value;
    savePlayerData(name);
    startGame();
});

function startGame() {
    document.getElementById('setup-section').classList.add('d-none');
    document.getElementById('game-section').classList.remove('d-none');
    document.getElementById('welcomeMsg').innerText = `Run for your life, ${getPlayerData()}!`;
    
    horrorQuestions.sort(() => Math.random() - 0.5);
    renderQuestion();
    console.log("EASTER EGG: Use revealAnswer() to cheat death.");
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const data = horrorQuestions[currentQuestionIndex];
    container.innerHTML = `<h3 class="creepster-font text-danger mb-4">${data.q}</h3>`;
    
    data.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "btn btn-outline-light m-2 w-75 py-2";
        btn.innerText = opt;
        btn.onclick = () => handleChoice(opt, data.a);
        container.appendChild(btn);
    });
}

function handleChoice(choice, correct) {
    if (choice === correct) {
        currentScore++;
    } else {
        slasherDistance += 25;
        document.getElementById('slasherBar').style.width = slasherDistance + "%";
    }

    if (slasherDistance >= 100) {
        alert("The Slasher caught you! Game Over.");
        location.reload();
    } else if (currentQuestionIndex + 1 < horrorQuestions.length) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        alert(`Survivor! Final Score: ${currentScore}/${horrorQuestions.length}`);
        location.reload();
    }
}

window.revealAnswer = () => console.log(`THE TRUTH: ${horrorQuestions[currentQuestionIndex].a}`);
document.getElementById('resetBtn').onclick = () => location.reload();
