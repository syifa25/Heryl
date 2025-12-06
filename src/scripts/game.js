(() => {

// ---------------------------------------------------------------------
// CANVAS
// ---------------------------------------------------------------------
const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// ---------------------------------------------------------------------
// KELAS SPRITE & BOUNDARY
// ---------------------------------------------------------------------
class Sprite {
    constructor({ position, image, scale = 1 }) {
        this.position = position;
        this.image = image;
        this.scale = scale;

        this.width = 0;
        this.height = 0;

        this.image.onload = () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;
        };
    }

    draw() {
        if (!this.width || !this.height) return;
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

class Boundary {
    static width = 48;
    static height = 48;

    constructor({ position }) {
        this.position = position;
        this.width = Boundary.width;
        this.height = Boundary.height;
    }

    draw() {
        c.fillStyle = "rgba(255,0,0,0.0)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// ---------------------------------------------------------------------
// COLLISION MAP (TETAP DARI DATA collisions.js)
// ---------------------------------------------------------------------
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];
const offset = { x: -88, y: -280 };

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 634) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }));
        }
    });
});

// ---------------------------------------------------------------------
// GAMBAR-GAMBAR
// ---------------------------------------------------------------------
const backgroundImage = new Image();
backgroundImage.src = "../img/untitled.png";

const foregroundImage = new Image();
foregroundImage.src = "../img/foregroundObjek.png";

const playerImage = new Image();
playerImage.src = "../img/yn_depan.png";

// ---------------------------------------------------------------------
// KUCING AUTOGENERATE DARI TILEMAP
// ---------------------------------------------------------------------
// ubah 1D array → 2D array (70 kolom per baris)
const kucingMap = [];
for (let i = 0; i < kucingData.length; i += 70) {
    kucingMap.push(kucingData.slice(i, i + 70));
}
const tileSize = 48;
const cats = [];

kucingMap.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value >= 184 && value <= 193) {
            const img = new Image();
            img.src = `../img/cat${value - 183}.png`;

            cats.push(
                new Sprite({
                    position: {
                        x: x * tileSize + offset.x,
                        y: y * tileSize + offset.y
                    },
                    image: img,
                    scale: 0.2
                })
            );
        }
    });
});

// ---------------------------------------------------------------------
// SPRITES
// ---------------------------------------------------------------------
const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: backgroundImage
});

const player = new Sprite({
    position: { x: canvas.width/2 - 8, y: canvas.height/2 - 8 },
    image: playerImage,
    scale: 2
});

const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: foregroundImage
});

// ---------------------------------------------------------------------
// MOVEMENT
// ---------------------------------------------------------------------
let nearCatIndex = -1;

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

const movables = [background, ...boundaries, ...cats, foreground];

window.addEventListener("keydown", e => {
    if (keys[e.key] !== undefined) keys[e.key].pressed = true;
});

window.addEventListener("keyup", e => {
    if (keys[e.key] !== undefined) keys[e.key].pressed = false;
});
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && nearCatIndex !== -1) {
        // hapus kucing dari array
        cats.splice(nearCatIndex, 1);
        nearCatIndex = -1;

        // update gameState
        addCatSaved(); // memanggil fungsi dari HTML

        document.getElementById("prompt").innerText = "";
    }
});

// ---------------------------------------------------------------------
// COLLISION FUNCTIONS
// ---------------------------------------------------------------------
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

function isTouching(a, b) {
    return (
        a.position.x < b.position.x + b.width &&
        a.position.x + a.width > b.position.x &&
        a.position.y < b.position.y + b.height &&
        a.position.y + a.height > b.position.y
    );
}

// ---------------------------------------------------------------------
// ANIMATE
// ---------------------------------------------------------------------
// ambil modal di awal
const winModal = document.getElementById("winModal");
const closeWinModalBtn = document.getElementById("closeWinModal");

// event listener tombol modal (cukup sekali)
closeWinModalBtn.addEventListener("click", () => {
    winModal.classList.add("hidden");
    window.location.reload(); // atau reset game
});

// ---------------------------------------------------------------------
// ANIMATE
// ---------------------------------------------------------------------
let gameWon = false; // flag supaya modal tidak muncul berulang

function animate() {
    requestAnimationFrame(animate);

    background.draw();
    boundaries.forEach(b => b.draw());

    nearCatIndex = -1;

    cats.forEach((cat, i) => {
        if (isTouching(player, cat)) {
            nearCatIndex = i;
            document.getElementById("prompt").innerText = "Tekan E untuk menyelamatkan kucing";
        }
        cat.draw();
    });

    if (nearCatIndex === -1) {
        document.getElementById("prompt").innerText = "";
    }

    player.draw();
    foreground.draw();

    let moving = true;

    // gerakan W
    if (keys.w.pressed) {
        for (let boundary of boundaries) {
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + 4 } }
            })) {
                moving = false; break;
            }
        }
        if (moving) movables.forEach(m => m.position.y += 4);
    }

    // gerakan S
    if (keys.s.pressed) {
        for (let boundary of boundaries) {
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - 4 } }
            })) {
                moving = false; break;
            }
        }
        if (moving) movables.forEach(m => m.position.y -= 4);
    }

    // gerakan A
    if (keys.a.pressed) {
        for (let boundary of boundaries) {
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: { ...boundary, position: { x: boundary.position.x + 4, y: boundary.position.y } }
            })) {
                moving = false; break;
            }
        }
        if (moving) movables.forEach(m => m.position.x += 4);
    }

    // gerakan D
    if (keys.d.pressed) {
        for (let boundary of boundaries) {
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: { ...boundary, position: { x: boundary.position.x - 4, y: boundary.position.y } }
            })) {
                moving = false; break;
            }
        }
        if (moving) movables.forEach(m => m.position.x -= 4);
    }

    // cek apakah semua kucing sudah diselamatkan
    if (cats.length === 0 && !gameWon) {
        gameWon = true; // set supaya modal cuma muncul sekali
        winModal.classList.remove("hidden"); // tampilkan modal
    }
}
}
playerImage.onload = () => {
    player.width = playerImage.width * player.scale;
    player.height = playerImage.height * player.scale;
    animate();
};
function addCatSaved() {
    gameState.catsSaved++;
    if (gameState.catsSaved % 5 === 0) { // tiap 5 kucing → level up
        levelUp();
        alert("Level Up! Sekarang level: " + gameState.level);
    }
    updateStatsUI();
    saveProgressToDB();
}

function levelUp() {
    gameState.level++;
    updateStatsUI();
    saveProgressToDB();
}

})();
