//Code base from p5.js user hychu31: circle text

const text1 = "im falling for your eyes"; 
const text2 = "but they dont know me yet";
const SEGMENTS = 200;

let centerX, centerY, fontSize;
let radius1, radius2;
let circText1, circText2;
let myFont;

function preload(){
    myFont = loadFont("avrile-serif.black-italic.woff");
}

function setup() {
    createCanvas(1000,1000
    );
    centerX = 1000/ 2;
    centerY = 1000/ 2;
    let screenPct = min(height, width) / 2000;
    fontSize = screenPct * 140;
    radius1 = screenPct * 300;
    radius2 = screenPct * 500;
    textFont(myFont);
    textSize(fontSize);
    circText1 = new drawText(text1, radius1, 1);
    circText2 = new drawText(text2, radius2, -1);
}

function draw() {
    background(206, 226, 240);
    circText2.drawTextCircle();
    circText2.drawShape(10, 20);
    circText1.drawTextCircle();
    circText1.drawShape(4, 255);
}

function drawText(textToWrite, rad, neg) {
    this.radius = rad;
    this.neg = neg;
    this.pointForIndex = function(pct) {
        let angle = pct * TWO_PI;
        let cosAngle = cos(angle);
        let sinAngle = sin(angle);
        return {
            x: this.radius * cosAngle + centerX,
            y: this.radius * sinAngle + centerY
        };
    }
    this.drawTextCircle = function() {
        let pct = atan2(mouseY - centerY, mouseX - centerX) / (this.neg * TWO_PI);
        let pixToAngularPct = 1 / (this.radius * TWO_PI);
        for (var i = 0; i < textToWrite.length; i++) {
            let charWidth = textWidth(textToWrite.charAt(i));
            pct += charWidth / 2 * pixToAngularPct;
            let leftP = this.pointForIndex(pct - 0.01);
            let rightP = this.pointForIndex(pct + 0.01);
            let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;
            push();
            fill(255);
            let p = this.pointForIndex(pct);
            translate(p.x, p.y);
            rotate(angle);
            translate(-p.x, -p.y);
            text(textToWrite.charAt(i), p.x - charWidth / 2, p.y);
            pop();
            pct += charWidth / 2 * pixToAngularPct;
        }
    }
    this.drawShape = function(weight, color) {
        push();
        fill(250, 170, 226);
        strokeWeight(weight);
        stroke(250, 170, 226);
        beginShape();
        for (let i = 0; i < SEGMENTS; i++) {
            let p0 = this.pointForIndex(i / SEGMENTS);
            vertex(p0.x, p0.y);
        }
        endShape(CLOSE);
        pop();
    }
}
