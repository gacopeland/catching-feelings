let player;
let obstacles = [];
let score = 0;
let gameSpeed = 6;
let obstacleInterval = 60;
let obstacleWidth = 20;
let obstacleHeight = 20;
let gameOver = false;

let words = ["From hate to love"];
let customFont;

function preload() {
  customFont = loadFont('avrile-serif.black-italic.woff'); // Load the custom font
}

function setup() {
  createCanvas(1000,1000);
  player = new Player();
  textFont(customFont); // Apply the custom font
}

function draw() {
  background(206, 226, 240);

  if (!gameOver) {
    if (frameCount % obstacleInterval === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].show();
      obstacles[i].move();

      if (obstacles[i].hits(player)) {
        gameOver = true;
        break;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
        score++;
        gameSpeed += 0.1;
        obstacleInterval = Math.max(30, 60 - score);
      }
    }

    player.show();
    player.move();

    fill(13, 105, 112);
    textSize(24);
    text(`Score: ${score}`, 10, 30);
  } else {
    fill(13, 105, 112);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    text(`Your score: ${score}`, width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && !player.jumping) {
    player.jump();
  }
}

class Player {
  constructor() {
    this.width = 20;
    this.height = 20;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height;
    this.velocity = 0;
    this.gravity = 0.6;
    this.lift = -15;
    this.jumping = false;
  }

  show() {
    fill(252);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height) {
      this.y = height - this.height;
      this.velocity = 0;
      this.jumping = false;
    }
  }

  jump() {
    this.velocity = this.lift;
    this.jumping = true;
  }
}

class Obstacle {
  constructor() {
    this.word = random(words); // Select a random word
    this.x = width;
    this.y = height - obstacleHeight;
    this.speed = gameSpeed;
    this.width = textWidth(this.word);
    this.height = textSize();
  }

  show() {
    fill(247, 118, 208);
    textSize(24);
    text(this.word, this.x, this.y);
  }

  move() {
    this.x -= this.speed;
  }

  hits(player) {
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y - this.height &&
      player.y + player.height > this.y - this.height
    );
  }

  offscreen() {
    return this.x + this.width < 0;
  }
}