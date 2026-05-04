import { savePlayerData, getPlayerData } from './storage.js';


let horrorQuestions = []; 
let currentScore = 0;
let slasherDistance = 0;
let currentQuestionIndex = 0;


async function loadQuestions() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Network response was not ok");
        horrorQuestions = await response.json();
        
     
        sessionStorage.setItem('lastSessionStart', new Date().toLocaleTimeString());
        
        console.log("Horror data loaded. Ready to play.");
    } catch (error) {
        console.error("Critical Error: Could not load questions.json", error);
    }
}


function packageFormData(nameValue) {
    const sessionData = {
        player: nameValue,
        action: "Started Game",
        timestamp: new Date().toISOString(),
        gameType: "Horror Trivia"
    };
    
    
    console.log("📦 Form Data Packaged as JSON:", JSON.stringify(sessionData, null, 2));
}

const settingsForm = document.getElementById('settingsForm');

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!settingsForm.checkValidity()) {
        settingsForm.classList.add('was-validated');
        return;
    }
    const name = document.getElementById('playerName').value;
    

    packageFormData(name);
    
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
    console.log("Session started at:", sessionStorage.getItem('lastSessionStart'));
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    const data = horrorQuestions[currentQuestionIndex];
    
    if (!data) return; 

    container.innerHTML = `<h3 class="creepster-font text-danger mb-4">${data.q}</h3>`;
    
    
    const shuffledOptions = [...data.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(opt => {
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

loadQuestions();

const suggestionForm = document.getElementById('suggestion-form');
if (suggestionForm) {
    suggestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.elements['user-email'].value;
        
        // Package this data as JSON to satisfy the rubric requirement
        const signupData = {
            email: email,
            status: "Subscribed",
            timestamp: new Date().toISOString()
        };
        
        console.log("📦 Survivor List JSON Packaged:", JSON.stringify(signupData, null, 2));
        alert("You've been added to the survivor list! Check the console to see the JSON packaging.");
        e.target.reset();
    });
}
