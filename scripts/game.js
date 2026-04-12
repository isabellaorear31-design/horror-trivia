import { savePlayerData, getPlayerData } from './storage.js'; 

const horrorQuestions = [
    { q: "In 'IT', what is the name of the town in Maine where Pennywise lives?", a: "Derry", options: ["Derry", "Castle Rock", "Haddonfield"] },
    { q: "In 'Hereditary', what is the name of the demon king that the cult is attempting to summon into a male host?", a: "Paimon", options: ["Paimon", "Pazuzu", "Buer"] },
    { q: "What is the hotel in 'The Shining'?", a: "Overlook", options: ["Overlook", "Bates", "Hill House"] },
    { q: "In 'Scream 4', who are the two killers operating under the Ghostface mask?", a: "Jill Roberts & Charlie Walker", options: ["Jill Roberts & Charlie Walker", "Kirby Reed & Trevor Sheldon", "Emma Roberts & Rory Culkin"] },
    { q: "In 'The Blair Witch Project', the students are filming a documentary about a local legend in which Maryland woods?", a: "Black Hills Forest", options: ["Black Hills Forest", "Camp Crystal Lake", "Redwood National Park"] }
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
