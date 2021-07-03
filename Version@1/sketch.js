let p_l;
let p_r;
let ball;
let score1 = 0;
let score2 = 0;
let img;
let level = 10;
let up;
let down;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  p_l = new Peddle(10);
  p_r = new Peddle(390);
  ball = new Ball();
  tap = new Peddle();
  img = loadImage("bot.jpeg");
  up = loadImage("up.jpeg");
  down = loadImage("down.jpeg");
}
function mousePressed() {
  //p_r.clicked();
  //p_r.tapped();
  if (up) {
   //p_r.mover();
    p_r.change_dir(-3);
  }else 
    if(down){
   // p_r.mover();
    p_r.change_dir(3);
  }
}

function keyPressed() {
  if (keyCode == 27) {
    noLoop();
  }
  if (keyCode == 32) {
    loop();
  }
  if (keyCode == UP_ARROW) {
    p_r.change_dir(-2);
  }
  if (keyCode == DOWN_ARROW) {
    p_r.change_dir(2);
  }
}

function draw() {
  background("cyan");
  textSize(15);
  //fill(255);
  //line(200, 0, 200, height);
  //line(0, height / 2, width, height / 2);
  text("Robot", 17, 30);
  text(score1, 35, 15);
  text("You", 355, 30);
  text(score2, 365, 15);
  push();
  textAlign(CENTER);
  text("Press Space to continue", 200, 220);
  text("Press Escape to pause", 200, 200);
  text("Press Up/Down Arrow key OR TAP", 200, 240);
  text("UP/DOWN ON the screen", 200, 260);
  text("to operate the Peddle", 200, 280);
  pop();
  p_r.move();
  p_l.robo();
  tap.tap();
  tap.tap1();
  p_r.show();
  p_l.move();
  p_l.update();
  p_r.update();
  ball.move();
  ball.update();
  ball.show();
  image(up, 250, 0, 150, 150);
  image(down, 250, 250, 150, 150);
  if (ball.x >= width) {
    score1++;
    ball.reset();
  }

  if (ball.x < 0) {
    score2++;
    ball.reset();
  }

  //detect collision
  if (ball.x >= 380 && ball.y <= p_r.y + 50 && ball.y >= p_r.y - 50) {
    ball.vx *= -1;
  }
  if (ball.x <= 50 && ball.y <= p_l.y + 50 && ball.y >= p_l.y - 50) {
    ball.vx *= -1;
  }
  if (score2 == 5) {
    push();
    textAlign(CENTER);
    noLoop();
    background(0);
    textSize(94);
    fill(0, 255, 0);
    text("You Won!", 200, 200);
    pop();
  }
  if (score1 == 5) {
    push();
    noLoop();
    textAlign(CENTER);
    background(0);
    fill(255, 0, 0);
    textSize(76);
    text("Game Over", 200, 200);
    pop();
  }
}
class Peddle {
  constructor(x) {
    this.x = x;
    this.y = 200;
    this.w = 20;
    this.h = 100;
    this.vy = 3;
    this.vx = 25;
    this.tapx = 200;
    this.tapy = 0;
    this.tapy1 = 200;
    this.tapx1 = 200;
  }
  update() {
    if (this.y >= height - 50 || this.y <= 50) {
      this.vy *= -1;
    }
  }

  change_dir(y) {
    this.vy = y;
  }
  dmover() {
    this.y += this.vx;
  }
  mover() {
    this.y -= this.vx;
  }
  move() {
    this.y += this.vy;
  }
  tap() {
    push();
    rectMode(CORNER);
    noFill();
    noStroke();
    rect(this.tapx, this.tapy, 200);
    pop();
  }
  tap1() {
    push();
    rectMode(CORNER);
    noFill();
    noStroke();
    rect(this.tapx1, this.tapy1, 200);
    pop();
  }
  show() {
    push();
    strokeWeight(3.8);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  robo() {
    image(img, this.x - 10, this.y - 50, this.w + 45, this.h);
  }
  clicked() {
    if ((mouseX, mouseY <= this.tapx, this.tapy)) {
      this.vy *= 1;
    }
  }
  tapped() {
    if ((mouseX, mouseY <= this.tapx1, this.tapy1)) {
      this.vy *= -1;
    }
  }
}
class Ball {
  constructor() {
    this.x = 200;
    this.y = 100;
    this.w = 20;
    this.vx = 3;
    this.vy = 3;
  }

  reset() {
    this.x = 200;
    this.y = random(10, 350);
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  update() {
    if (this.y >= height - 10 || this.y <= 10) {
      this.vy *= -1;
    }
  }
  show() {
    ellipse(this.x, this.y, this.w);
  }
}
