(() => {

const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// ----- Map collision -----
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];
const offset = { x: -88, y: -280 };

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 634)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
    });
});

// ----- Images -----
const backgroundImage = new Image();
backgroundImage.src = "../img/untitled.png";

const foregroundImage = new Image();
foregroundImage.src = "../img/foregroundObjek.png";

const playerImage = new Image();
playerImage.src = "../img/yn_depan.png"; // hanya 1 gambar statis

// ----- Sprites -----
const background = new Sprite({ position: { x: offset.x, y: offset.y }, image: backgroundImage });
const foreground = new Sprite({ position: { x: offset.x, y: offset.y }, image: foregroundImage });
const player = new Sprite({ position: { x: canvas.width/2 - 16/2, y: canvas.height/2 - 16/2 }, image: playerImage, scale: 2 });

// ----- Keys & Movement -----
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

const movables = [background, ...boundaries, foreground];

window.addEventListener("keydown", e => {
    if (keys[e.key] !== undefined) keys[e.key].pressed = true;
});

window.addEventListener("keyup", e => {
    if (keys[e.key] !== undefined) keys[e.key].pressed = false;
});

// ----- Collision -----
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

// ----- Animate -----
function animate() {
    requestAnimationFrame(animate);

    background.draw();
    boundaries.forEach(boundary => boundary.draw());
    player.draw();
    foreground.draw();

    let moving = true;

    if (keys.w.pressed) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + 4 } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(m => m.position.y += 4);
    }

    if (keys.s.pressed) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - 4 } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(m => m.position.y -= 4);
    }

    if (keys.a.pressed) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x + 4, y: boundary.position.y } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(m => m.position.x += 4);
    }

    if (keys.d.pressed) {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (rectangularCollision({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x - 4, y: boundary.position.y } } })) {
                moving = false;
                break;
            }
        }
        if (moving) movables.forEach(m => m.position.x -= 4);
    }
}

// ----- Start Game -----
function startGame() {
    animate();
}

// mulai game setelah playerImage load
playerImage.onload = () => {
    startGame();
};

window.startGame = startGame;

})(); // <- IIFE ditutup
