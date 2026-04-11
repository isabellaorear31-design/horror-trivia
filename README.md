# Final Girl: Horror Trivia
**Date:** April 13, 2026  
**Developer:** Isabella O'Rear

## Project Objective
The goal of this project is to test the player's knowledge of classic horror movies in a high-stakes environment. Players must answer questions correctly to stay ahead of the "Slasher."

## Game Rules
1. Enter your name and click "Enter the Woods" to begin.
2. For every question you get wrong, the Slasher gets 25% closer.
3. If the Slasher Distance bar hits 100%, the game is over.
4. If you answer all questions correctly before being caught, you survive the night!

## Technologies Used
* **HTML5:** Semantic landmark elements for accessibility.
* **Gemini:** For structural help. 
* **Bootstrap 5:** Navbar, Modal, Progress Bar, and Grid layout.
* **CSS3:** Custom variables, Google Fonts (Creepster), and advanced attribute selectors.
* **JavaScript (ES Modules):** Modular logic for game state and web storage.
* **Web Storage:** LocalStorage used to persist survivor names.

## Resources & Assets
* **Slasher Icon:** [Grim Reaper Icon by juicy_fish - Flaticon](https://www.flaticon.com/free-icons/grim-reaper)
* **Fonts:** [Google Fonts - Creepster](https://fonts.google.com/specimen/Creepster)
* **Wireframe:** Included in the repository at `images/wireframe.png`

## Wireframe
![Game Wireframe](images/wireframe.png)

## Code Explanation
In this snippet from `scripts/game.js`, I use an arrow function with the `sort()` method to satisfy the **Randomization** requirement. By returning a random number subtracted by 0.5, the array elements are shuffled in a random order every time the game starts.

```javascript
function startGame() {
    // Shuffles the question array randomly
    horrorQuestions.sort(() => Math.random() - 0.5); 
    
    currentQuestionIndex = 0;
    renderQuestion();
}
