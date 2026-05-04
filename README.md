# Final Girl: Horror Trivia
> A high-stakes horror trivia game where you must outsmart a slasher to survive the night.

### **Author**
[Isabella O'Rear](https://github.com/isabellaorear31-design)

### **User Story**
* **As a** horror movie enthusiast,
* **I want** to test my knowledge of classic slasher films in an interactive environment,
* **So that** I can prove my survival skills and see my name on the survivor list.

### **Narrative**
The goal of this project is to test the player's knowledge of classic horror movies in a high-stakes environment. I chose this project because I wanted to combine my interest in the horror genre with interactive UI elements. During development, I transitioned the project from static content to a dynamic application using **JavaScript Modules** and the **Fetch API**. I improved the original concept by adding a "Slasher Distance" mechanic: for every question you get wrong, the Slasher gets 25% closer. 

### **Game Rules**
1. Enter your name and click "Enter the Woods" to begin.
2. For every question you get wrong, the Slasher gets 25% closer.
3. If the Slasher Distance bar hits 100%, the game is over.
4. If you answer all questions correctly before being caught, you survive the night!

### **Attribution**
* **HTML5:** Semantic landmark elements for accessibility.
* **Gemini:** For structural and organizational help.
* **Bootstrap 5:** Navbar, Modal, Progress Bar, and Grid layout.
* **CSS3:** Custom variables, Google Fonts (Creepster), and advanced attribute selectors.
* **JavaScript (ES Modules):** Modular logic for game state and web storage.
* **Web Storage:** LocalStorage used to persist survivor names.
* **Slasher Icon:** [Grim Reaper Icon by juicy_fish - Flaticon](https://www.flaticon.com/free-icons/grim-reaper)
* **Fonts:** [Google Fonts - Creepster](https://fonts.google.com/specimen/Creepster)
* **Wireframe:** Included in the repository at `images/wireframe.png`

## Wireframe
![Game Wireframe](images/wireframe.png)

### **Project Structure**
```text
.
├── images/
│   ├── game-thumb.png
│   ├── slasher-icon.png
│   └── wireframe.png
├── scripts/
│   ├── game.js
│   └── storage.js
├── styles/
│   └── game.css
├── index.html
├── questions.json
└── README.md
```
### **Code Highlight**
This snippet handles the **Asynchronous Data Retrieval** for the game's trivia questions using the Fetch API.

* **What it does:** It uses `async/await` to fetch question data from an external JSON file and initializes a session timestamp.
* **Why it matters:** It satisfies the requirement for external data handling and ensures the game logic is decoupled from the data.
* **How it works:** It waits for the server response before parsing the JSON into the game state.

```javascript
async function loadQuestions() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) throw new Error("Network response failed");
        horrorQuestions = await response.json();
        
        sessionStorage.setItem('lastSessionStart', new Date().toLocaleTimeString());
        console.log("Horror data loaded asynchronously.");
    } catch (error) {
        console.error("Critical Error:", error);
    }
}
```
### **Validation**
* [Nu HTML Validator Result](https://validator.w3.org/nu/?doc=https://isabellaorear31-design.github.io/horror-trivia/)
* [WAVE Accessibility Report](https://wave.webaim.org/report#/https://isabellaorear31-design.github.io/horror-trivia/)

### **Future Improvements**
All planned updates, feature ideas, and known issues are tracked in the milestone below:
👉 [Sprint 99 Milestone](https://github.com/isabellaorear31-design/horror-trivia/milestones)
