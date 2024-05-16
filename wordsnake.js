let snake;
let food;
let gridSize = 20;
let score = 0;
let gameSpeed = 10;
let gameOver = false;
let words = ["I'm in love now"];
let customFont;

function preload() {
  customFont = loadFont('avrile-serif.black-italic.woff');
}

function setup() {
  createCanvas(1000,1000);
  frameRate(gameSpeed);
  snake = new Snake();
  food = createFood();
  textSize(gridSize);
  textAlign(CENTER, CENTER);
  textFont(customFont); // Apply the custom font
}

function draw() {
  background(206, 226, 240);
  if (!gameOver) {
    snake.update();
    snake.show();
    if (snake.eat(food)) {
      score++;
      food = createFood();
    }
    fill(13, 105, 112);
    text("Settle down", food.x + gridSize / 2, food.y + gridSize / 2);
    fill(252);
    textSize(24);
    text(`Score: ${score}`, 70, 30);
    if (snake.endGame()) {
      score = 0;
      snake = new Snake();
      food = createFood();
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.changeDirection(0, -1);
      break;
    case DOWN_ARROW:
      snake.changeDirection(0, 1);
      break;
    case LEFT_ARROW:
      snake.changeDirection(-1, 0);
      break;
    case RIGHT_ARROW:
      snake.changeDirection(1, 0);
      break;
  }
}

function createFood() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  return createVector(floor(random(cols)), floor(random(rows))).mult(gridSize);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xdir = 0;
    this.ydir = 0;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();

    head.x += this.xdir * gridSize;
    head.y += this.ydir * gridSize;
    this.body.push(head);
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(247, 118, 208);
      let word = words[i % words.length];
      text(word, this.body[i].x + gridSize / 2, this.body[i].y + gridSize / 2);
    }
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    if (head.x >= width || head.x < 0 || head.y >= height || head.y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }
    return false;
  }

  changeDirection(x, y) {
    this.xdir = x;
    this.ydir = y;
  }
}
