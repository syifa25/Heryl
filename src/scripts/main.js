window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");

    if (!canvas) {
        console.error("Canvas tidak ditemukan!");
        return;
    }

    // Pastikan startGame() ada
    if (window.startGame) {
        window.startGame();
    } else {
        console.error("startGame() tidak ditemukan! Pastikan game.js dimuat dulu.");
    }
});
