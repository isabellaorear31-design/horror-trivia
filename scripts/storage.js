export function savePlayerData(name) {
    localStorage.setItem('horrorSurvivor', name);
}

export function getPlayerData() {
    return localStorage.getItem('horrorSurvivor') || "Survivor";
}
