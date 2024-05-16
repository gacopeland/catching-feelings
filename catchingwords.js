let player;
let drops = [];
let score = 0;
let words = ["falling", "in", "in", "love"]; // Array of words
let customFont;

function preload() {
  customFont = loadFont('avrile-serif.black-italic.woff');
}

function setup() {
  createCanvas(1000,1000);
  textFont(customFont); // Set the custom font
  player = new Player();
  setInterval(createDrop, 1000);
}

function draw() {
  background(206, 226, 240);
  player.show();
  player.update();

  for (let i = drops.length - 1; i >= 0; i--) {
    drops[i].show();
    drops[i].update();

    if (drops[i].hits(player)) {
      drops.splice(i, 1);
      score++;
    } else if (drops[i].y > height) {
      drops.splice(i, 1);
    }
  }

  fill(13, 105, 112);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
}

function createDrop() {
  let drop = new Drop();
  drops.push(drop);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.width = 40;
    this.height = 10;
  }

  show() {
    fill(13, 105, 112);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }

  move(dir) {
    this.x += dir * 5;
  }
}

class Drop {
  constructor() {
    this.word = random(words); // Select a random word
    this.x = random(width);
    this.y = 0;
    this.speed = random(1, 5);
    this.width = textWidth(this.word);
    this.height = textSize();
  }

  show() {
    fill(247, 118, 208);
    textSize(24);
    text(this.word, this.x, this.y);
  }

  update() {
    this.y += this.speed;
  }

  hits(player) {
    return (
      this.x > player.x - player.width / 2 &&
      this.x < player.x + player.width / 2 &&
      this.y > player.y - player.height / 2 &&
      this.y < player.y + player.height / 2
    );
  }
}