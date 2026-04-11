import { savePlayerData, getPlayerData, saveDifficulty, getDifficulty } from './storage.js';


const horrorQuestions = [
    { q: "Who is the killer in the 'Halloween' franchise?", a: "Michael Myers", options: ["Michael Myers", "Jason Voorhees", "Freddy Krueger"] },
    { q: "Which movie features a possessed doll named Chucky?", a: "Child's Play", options: ["Annabelle", "Child's Play", "Dead Silence"] },
    { q: "What is the name of the hotel in 'The Shining'?", a: "Overlook", options: ["Overlook", "Bates", "Hill House"] },
    { q: "In 'Scream', what is the killer's costume called?", a: "Ghostface", options: ["Ghostface", "The Shape", "Leatherface"] },
    { q: "Which film has the line: 'They're coming to get you, Barbara'?", a: "Night of the Living Dead", options: ["Night of the Living Dead", "Dawn of the Dead", "Evil Dead"] }
];

let currentScore = 0;
let slasherDistance = 0;
let currentQuestionIndex = 0;


const settingsForm = document.getElementById('settingsForm');
const setupArea = document.getElementById('setup-section');
const gameArea = document.getElementById('game-section');

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
    setupArea.classList.add('d-none');
    gameArea.classList.remove('d-none');
    
    document.getElementById('welcomeMsg').innerText = `Run for your life, ${getPlayerData()}!`;
    
    horrorQuestions.sort(() => Math.random() - 0.5);
    
    currentQuestionIndex = 0;
    slasherDistance = 0;
    renderQuestion();


    console.log("SURVIVAL TIP: Type 'revealAnswer()' to see the truth.");
}

function renderQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const data = horrorQuestions[currentQuestionIndex];
    
  
    quizContainer.innerHTML = `<h3 class="mb-4">${data.q}</h3>`;
    
   
    const shuffledOptions = [...data.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.className = "btn btn-outline-danger m-2 w-75 py-2";
        btn.innerText = option;
        btn.addEventListener('click', () => handleChoice(option, data.a));
        quizContainer.appendChild(btn);
    });
}

function handleChoice(choice, correct) {
    const bar = document.getElementById('slasherBar');

    if (choice === correct) {
        currentScore++;
    } else {
        
        slasherDistance += 25; 
        bar.style.width = slasherDistance + "%";
        
        bar.setAttribute('aria-valuenow', slasherDistance);
    }

    if (slasherDistance >= 100) {
        alert("The Slasher caught you! GAME OVER.");
        location.reload();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < horrorQuestions.length) {
            renderQuestion();
        } else {
            alert(`You survived! Final Score: ${currentScore}/${horrorQuestions.length}`);
            location.reload();
        }
    }
}


window.revealAnswer = () => {
    console.log(`%c THE ANSWER IS: ${horrorQuestions[currentQuestionIndex].a}`, "color: red; font-weight: bold;");
};


document.getElementById('resetBtn').addEventListener('click', () => location.reload());
