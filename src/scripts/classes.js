const canvas = document.getElementById("gameCanvas");
const c = canvas.getContext("2d");

class Sprite {
    constructor({ position, image, scale = 1 }) {
        this.position = position;
        this.image = image;
        this.scale = scale;

        // tunggu gambar load dulu
        this.image.onload = () => {
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;
        };
    }

    draw() {
        // pakai 1 image saja, tidak ada arah / frames
        if (!this.width || !this.height) return; // tunggu load
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
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
        c.fillStyle = "rgba(225, 0, 0, 0.0)";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
