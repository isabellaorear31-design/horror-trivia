export function savePlayerData(name) {
    localStorage.setItem('horrorSurvivorName', name);
}


export function getPlayerData() {
    return localStorage.getItem('horrorSurvivorName') || "";
}


export function saveDifficulty(level) {
    localStorage.setItem('horrorDifficulty', level);
}

export function getDifficulty() {
    return localStorage.getItem('horrorDifficulty') || "Easy";
}
